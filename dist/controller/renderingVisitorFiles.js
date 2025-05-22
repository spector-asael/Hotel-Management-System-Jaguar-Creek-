"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadVisitorRooms = exports.loadAboutPage = exports.loadContactPage = exports.loadTeamPage = exports.loadGuestHomepage = exports.loadSignupSuccess = exports.loadSignupForm = exports.loadHomePage = exports.loadLoginForm = void 0;
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
const loadSignupSuccess = (req, res) => {
    res.render('visitor/success/signup-success');
};
exports.loadSignupSuccess = loadSignupSuccess;
const loadGuestHomepage = (req, res) => {
    res.render('guest/homepage/homepage');
};
exports.loadGuestHomepage = loadGuestHomepage;
const loadTeamPage = (req, res) => {
    res.render('visitor/team/team');
};
exports.loadTeamPage = loadTeamPage;
const loadContactPage = (req, res) => {
    res.render('visitor/contact/contact');
};
exports.loadContactPage = loadContactPage;
const loadAboutPage = (req, res) => {
    res.render('visitor/about/about');
};
exports.loadAboutPage = loadAboutPage;
const loadVisitorRooms = (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.render("guest/rooms/rooms");
    }
    else if (user.role == 0) {
        res.redirect('/guest/rooms');
    }
};
exports.loadVisitorRooms = loadVisitorRooms;
