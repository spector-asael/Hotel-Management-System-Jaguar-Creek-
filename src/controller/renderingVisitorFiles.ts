import { Request, Response} from 'express';
import path from 'path';

export const loadLoginForm = (req: Request, res: Response) => {
    res.render('visitor/login/login');
}

export const loadHomePage = (req: Request, res: Response) => {
    res.render('visitor/homepage/homepage');
}

export const loadSignupForm = (req: Request, res: Response) => {
    res.render('visitor/signup/signup');
}

export const loadSignupSuccess = (req: Request, res: Response) => {
    res.render('visitor/success/signup-success');
}

export const loadGuestHomepage = (req: Request, res: Response) => {
    res.render('guest/homepage/homepage');
}

export const loadTeamPage = (req: Request, res: Response) => {
    res.render('visitor/team/team');
}

export const loadContactPage = (req: Request, res: Response) => {
    res.render('visitor/contact/contact');
}
export const loadAboutPage = (req: Request, res: Response) => {
    res.render('visitor/about/about');
} 