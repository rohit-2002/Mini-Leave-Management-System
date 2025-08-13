import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { calculateDays, hasOverlap } from "../utils/leaveUtils.js";

const getAllLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find().populate(
    "employee",
    "name email department"
  );
  res.json(leaves);
});

const applyLeave = asyncHandler(async (req, res) => {
  const { employeeId, startDate, endDate } = req.body;
  const employee = await Employee.findById(employeeId);

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  if (new Date(startDate) < employee.joiningDate)
    return res
      .status(400)
      .json({ message: "Leave before joining date not allowed" });

  if (new Date(endDate) < new Date(startDate))
    return res.status(400).json({ message: "Invalid date range" });

  const requestedDays = calculateDays(startDate, endDate);
  if (requestedDays > employee.leaveBalance)
    return res.status(400).json({ message: "Insufficient leave balance" });

  if (await hasOverlap(employeeId, startDate, endDate))
    return res.status(400).json({ message: "Overlapping leave request" });

  const leave = new Leave({ employee: employeeId, startDate, endDate });
  await leave.save();
  res.status(201).json(leave);
});

const approveLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id).populate("employee");
  if (!leave)
    return res.status(404).json({ message: "Leave request not found" });

  if (leave.status === "Approved")
    return res.status(400).json({ message: "Leave already approved" });

  leave.status = "Approved";
  leave.employee.leaveBalance -= calculateDays(leave.startDate, leave.endDate);

  await leave.employee.save();
  await leave.save();

  res.json(leave);
});
const rejectLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave)
    return res.status(404).json({ message: "Leave request not found" });

  leave.status = "Rejected";
  await leave.save();
  res.json(leave);
});
export { getAllLeaves, applyLeave, approveLeave, rejectLeave };
