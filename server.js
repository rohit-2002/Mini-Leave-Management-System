import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import employeeRoutes from "./src/routes/employees.js";
import leaveRoutes from "./src/routes/leaves.js";
import errorHandler from "./src/middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
