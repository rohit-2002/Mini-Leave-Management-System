import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: String,
  joiningDate: { type: Date, required: true },
  leaveBalance: { type: Number, default: 20 },
});

export default mongoose.model("Employee", employeeSchema);
