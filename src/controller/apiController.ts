import { Request, Response } from 'express';
import Guest from '../models/guest';
import User from '../models/user';

export async function signupGuest(req: Request, res: Response): Promise<void> {
  const {
    firstname,
    lastname,
    email,
    username,
    password,
    confirmpassword,
    phone,
  } = req.body;

  if (password !== confirmpassword) {
    res.status(400).send('Passwords do not match.');
    return;
  }

  try {
    const userId = Math.floor(Math.random() * 1000000);

    const guest = new Guest(
      userId,
      firstname,
      lastname,
      phone,
      username,
      password,
      email
    );

    await guest.createGuest();

    res.redirect('/visitor/signup-success');
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send('Server error. Could not sign up.');
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    const role = await User.findRole(username);
    if (role === -1) {
      res.status(404).send('User not found.');
      return;
    }

    if (role === 0) {
      // Guest login
      const success = await loginGuest(username, password, req, res);
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
    } else if (role === 2) {
      res.redirect('/admin');
    } else {
      res.redirect('/visitor/login');
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal server error.');
  }
}

export async function loginGuest(
  username: string,
  password: string,
  req: Request,
  res: Response
): Promise<boolean> {

  try {
    const guest = await Guest.findByUsername(username);
    
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
  } catch (err) {
    console.error('Guest login error:', err);
    res.status(500).send('Server error.');
    return false;
  }
}
