import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoutes } from "../modules/division/division.route";
import { DistrictRoutes } from "../modules/district/district.routes";
import { UpazilaRoutes } from "../modules/upazila/upazila.routes";
import { HousingRoutes } from "../modules/housing/housing.route";
import { FacilitiesRoutes } from "../modules/facilities/facilities.route";
import { AmenitiesRoutes } from "../modules/amenities/amenities.routes";
import { ProjectRoutes } from "../modules/projects/project.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/div",
    route: DivisionRoutes,
  },
  {
    path: "/dist",
    route: DistrictRoutes,
  },
  {
    path: "/upazila",
    route: UpazilaRoutes,
  },
  {
    path: "/housing",
    route: HousingRoutes,
  },
  {
    path: "/facilities",
    route: FacilitiesRoutes,
  },
  {
    path: "/amenity",
    route: AmenitiesRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
