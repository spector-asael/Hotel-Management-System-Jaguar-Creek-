"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGuestByUsername = searchGuestByUsername;
exports.searchGuestById = searchGuestById;
const guest_1 = __importDefault(require("../models/guest"));
function searchGuestByUsername(req, res) {
    const { username } = req.body;
    const user = guest_1.default.findByUsername(username);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
}
function searchGuestById(req, res) {
    const { id } = req.body;
    console.log("Searching guest by ID:", id);
    // Replace this with real logic, like querying a database
    // const guest = await Guest.findById(id);
    // res.render("employee/guest/guest", { guest });
    res.send(`Search by ID: ${id}`); // Placeholder
}
