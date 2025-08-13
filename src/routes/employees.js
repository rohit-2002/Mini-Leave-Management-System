import express from "express";
import {
  getAllEmployees,
  addEmployee,
  getLeaveBalance,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.get("/:id/leave-balance", getLeaveBalance);

export default router;
