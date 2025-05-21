import { Request, Response } from "express";
import Guest from "../models/guest";
import User from "../models/user";

export function searchGuestByUsername(req: Request, res: Response) {
    const { username } = req.body;
    
    const user = Guest.findByUsername(username);
    if(!user) {
        res.status(404).send("User not found");
        return;
    }
}
  
  export function searchGuestById(req: any, res: any) {
    const { id } = req.body;
  
    console.log("Searching guest by ID:", id);
  
    // Replace this with real logic, like querying a database
    // const guest = await Guest.findById(id);
    // res.render("employee/guest/guest", { guest });
  
    res.send(`Search by ID: ${id}`); // Placeholder
  }