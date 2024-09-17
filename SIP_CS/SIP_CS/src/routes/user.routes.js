import { Router } from "express";
import { createUser, getUsers, getUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import { createEmployee, getEmployees, getEmployee, deleteEmployee, updateEmployee } from "../controllers/employee.controller.js";
const router = Router();

// router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getUsers);
router.post("/", [checkExistingUser], createUser);
router.get("/", getUsers);
router.get("/:userId", [verifyToken, isAdmin, checkExistingUser], getUser);
router.delete("/", deleteEmployee);
router.put("/", updateEmployee);
export default router;
