import express from "express";
import {
  getAllLeaves,
  applyLeave,
  approveLeave,
  rejectLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getAllLeaves);
router.post("/apply", applyLeave);
router.put("/:id/approve", approveLeave);
router.put("/:id/reject", rejectLeave);

export default router;
