import Employee from "../models/Employee.js";
import asyncHandler from "../middlewares/asyncHandler.js";
const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, department, joiningDate } = req.body;
  const employee = new Employee({ name, email, department, joiningDate });
  await employee.save();
  res.status(201).json(employee);
});

const getLeaveBalance = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json({ leaveBalance: employee.leaveBalance });
});
export { getAllEmployees, addEmployee, getLeaveBalance };
