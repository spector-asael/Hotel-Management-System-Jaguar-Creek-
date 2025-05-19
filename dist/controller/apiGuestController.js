"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupGuest = signupGuest;
exports.loginGuest = loginGuest;
const guest_1 = __importDefault(require("../models/guest"));
function signupGuest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstname, lastname, email, username, password, confirmpassword, phone, } = req.body;
        // Basic validation
        if (password != confirmpassword) {
            res.status(400).send('Passwords do not match.');
            return; // <--- Important
        }
        try {
            const userId = Math.floor(Math.random() * 1000000);
            const guest = new guest_1.default(userId, firstname, lastname, phone, username, password, email);
            yield guest.createGuest();
            res.redirect('/visitor/signup-success');
            return; // <--- Important
        }
        catch (error) {
            console.error('Signup error:', error);
            res.status(500).send('Server error. Could not sign up.');
            return; // <--- Important
        }
    });
}
function loginGuest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const guest = yield guest_1.default.findByUsername(username);
            if (!guest) {
                res.status(404).send('User not found.');
                return;
            }
            console.log(guest);
            const role = guest.validatePassword(username, password);
            if (role == -1) {
                res.status(401).send('Incorrect password.');
                return;
            }
            res.redirect('guest/dashboard');
            return;
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Server error.');
            return;
        }
    });
}
