import Leave from "../models/Leave.js";

const calculateDays = (startDate, endDate) => {
  return (
    Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    ) + 1
  );
};

const hasOverlap = async (employeeId, startDate, endDate) => {
  return await Leave.findOne({
    employee: employeeId,
    status: { $in: ["Pending", "Approved"] },
    $or: [
      { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
      { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
    ],
  });
};
export { calculateDays, hasOverlap };
