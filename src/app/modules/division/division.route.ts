import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";

import { checkAuth } from "../../middlewares/checkAuth";
import { createDivisionZodSchema, updateDivisionZodSchema } from "./division.validation";
import { Role } from "../user/user.interface";
import { DivisionControllers } from "./division.controller";

const router = Router();
router.post(
    "/create-division",
    checkAuth(Role.ADMIN),
    validateRequest(createDivisionZodSchema),
    DivisionControllers.createDivision
);
router.get(
    "/get-division",
    checkAuth(Role.ADMIN),
    DivisionControllers.getSingleDivision
);
router.get(
    "/get-all-division",
    checkAuth(Role.ADMIN),
    DivisionControllers.getAllDivision
);

router.patch(
    "/",
    validateRequest(updateDivisionZodSchema),
    checkAuth(Role.ADMIN),
    DivisionControllers.updateDivision
);

export const DivisionRoutes = router;
