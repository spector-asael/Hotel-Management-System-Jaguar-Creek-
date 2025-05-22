import { Request, Response } from 'express';
import Guest from '../models/guest';
import User from '../models/user';
import { Admin } from '../models/admin';
import Employee from '../models/employee';
import Reservation from '../models/reservations';
import HotelRoom from '../models/hotelroom';


export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Failed to log out');
      }

      // Clear the cookie (optional but recommended)
      res.clearCookie('connect.sid'); // or whatever your session cookie is named

      // Redirect to login or home page
      res.redirect('/');
  });
};

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

        res.redirect('/guest');
    
      return;
    }

    if (role === 1) {
      const success = await loginEmployee(username, password, req, res);
      if (!success) {
        res.status(401).send('Invalid credentials for employee.');
      }

        res.redirect('/employee');
      return;
    }

    if (role === 2) {
      const success = await loginAdmin(username, password, req, res);
      if (!success) {
        res.status(401).send('Invalid credentials for admin.');
      }

        res.redirect('/admin');
      return;
    }
     
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal server error.');
  }
}

export async function loginGuest(username: string, password: string, req: Request, res: Response): Promise<boolean> {

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

    return true;

  } catch (err) {
    console.error('Guest login error:', err);
    res.status(500).send('Server error.');
    return false;
  }

}

export async function loginEmployee(
  username: string,
  password: string,
  req: Request,
  res: Response
): Promise<boolean> {
  try {
    const employee = await Employee.findByUsername(username);
    
    if (!employee) {
      return false;
    }

    const valid = employee.validatePassword(username, password);
    if (valid == -1) {
      return false;
    }

    req.session.user = {
      id: employee.getUserId(),
      username: employee.getUsername(),
      role: 1,
    };

    return true;

  } catch (err) {
    console.error('Employee login error:', err);
    res.status(500).send('Server error.');
    return false;
  }
}

export async function loginAdmin(
  username: string,
  password: string,
  req: Request,
  res: Response
): Promise<boolean> {
  try {
    const admin = await Admin.findByUsername(username);
    
    if (!admin) {
      return false;
    }

    const valid = admin.validatePassword(username, password);
    if (valid == -1) {
      return false;
    }

    req.session.user = {
      id: admin.getUserId(),
      username: admin.getUsername(),
      role: 2,
    };

    return true;

  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).send('Server error.');
    return false;
  }
}
