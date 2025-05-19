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
exports.loginUser = loginUser;
exports.loginGuest = loginGuest;
const guest_1 = __importDefault(require("../models/guest"));
const user_1 = __importDefault(require("../models/user"));
function signupGuest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstname, lastname, email, username, password, confirmpassword, phone, } = req.body;
        if (password !== confirmpassword) {
            res.status(400).send('Passwords do not match.');
            return;
        }
        try {
            const userId = Math.floor(Math.random() * 1000000);
            const guest = new guest_1.default(userId, firstname, lastname, phone, username, password, email);
            yield guest.createGuest();
            res.redirect('/visitor/signup-success');
        }
        catch (error) {
            console.error('Signup error:', error);
            res.status(500).send('Server error. Could not sign up.');
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const role = yield user_1.default.findRole(username);
            if (role === -1) {
                res.status(404).send('User not found.');
                return;
            }
            if (role === 0) {
                // Guest login
                const success = yield loginGuest(username, password, req, res);
                if (!success) {
                    res.status(401).send('Invalid credentials for guest.');
                }
                return;
            }
            // Employee/Admin login
            /*
            const user = await User.findByUsername(username);
            if (!user || !user.validatePassword(password)) {
              res.status(401).send('Invalid credentials.');
              return;
            }
            
            // Save session
            req.session.user = {
              id: user.id,
              username: user.username,
              role: role,
            };
            */
            // Redirect based on role
            if (role === 1) {
                res.redirect('/employee');
            }
            else if (role === 2) {
                res.redirect('/admin');
            }
            else {
                res.redirect('/visitor/login');
            }
        }
        catch (err) {
            console.error('Login error:', err);
            res.status(500).send('Internal server error.');
        }
    });
}
function loginGuest(username, password, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const guest = yield guest_1.default.findByUsername(username);
            if (!guest) {
                return false;
            }
            const role = guest.validatePassword(username, password);
            if (role == -1) {
                return false;
            }
            req.session.user = {
                id: guest.getUserId(),
                username: guest.getUsername(),
                role: 0,
            };
            res.redirect('/');
            return true;
        }
        catch (err) {
            console.error('Guest login error:', err);
            res.status(500).send('Server error.');
            return false;
        }
    });
}
