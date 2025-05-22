import { loadAdminEmployeeForm, loadAdminUsers, loadAdminHotelForm, loadHotels } from "../controller/adminController";

import express from "express";

const adminFilesRouter = express.Router();

adminFilesRouter.get('/', (req, res) => {
    res.redirect('/admin/dashboard/employees');
});

adminFilesRouter.get('/dashboard/employees', loadAdminUsers);
adminFilesRouter.get('/dashboard/hotels', loadHotels);
adminFilesRouter.get('/dashboard/add-employees', loadAdminEmployeeForm);
adminFilesRouter.get('/dashboard/add-hotels', loadAdminHotelForm);

export default adminFilesRouter;