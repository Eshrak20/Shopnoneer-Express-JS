"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const division_route_1 = require("../modules/division/division.route");
const district_routes_1 = require("../modules/district/district.routes");
const upazila_routes_1 = require("../modules/upazila/upazila.routes");
const housing_route_1 = require("../modules/housing/housing.route");
const facilities_route_1 = require("../modules/facilities/facilities.route");
const amenities_routes_1 = require("../modules/amenities/amenities.routes");
const project_routes_1 = require("../modules/projects/project.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/div",
        route: division_route_1.DivisionRoutes,
    },
    {
        path: "/dist",
        route: district_routes_1.DistrictRoutes,
    },
    {
        path: "/upazila",
        route: upazila_routes_1.UpazilaRoutes,
    },
    {
        path: "/housing",
        route: housing_route_1.HousingRoutes,
    },
    {
        path: "/facilities",
        route: facilities_route_1.FacilitiesRoutes,
    },
    {
        path: "/amenity",
        route: amenities_routes_1.AmenitiesRoutes,
    },
    {
        path: "/project",
        route: project_routes_1.ProjectRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
