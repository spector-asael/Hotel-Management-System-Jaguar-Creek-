"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSignupForm = exports.loadHomePage = exports.loadLoginForm = void 0;
const loadLoginForm = (req, res) => {
    res.render('visitor/login/login');
};
exports.loadLoginForm = loadLoginForm;
const loadHomePage = (req, res) => {
    res.render('visitor/homepage/homepage');
};
exports.loadHomePage = loadHomePage;
const loadSignupForm = (req, res) => {
    res.render('visitor/signup/signup');
};
exports.loadSignupForm = loadSignupForm;
