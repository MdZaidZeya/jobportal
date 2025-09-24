import { getAllUsers, addUser, confirmLogin } from '../models/User.js';

export const showRegister = (req, res) => {
  res.render('register', { title: 'Register', errors: [], formData: {} });
};

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = getAllUsers().find(user => user.email === email);
  if (existingUser) {
    return res.render('register', { title: 'Register', errors: ['Email already registered'], formData: req.body });
  }
  addUser(name, email, password);
  res.redirect('/');
};

export const showLogin = (req, res) => {
  res.render('login', { title: 'Login', errors: [], formData: {} });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = confirmLogin(email, password);
  if (!user) {
    return res.render('login', { title: 'Login', errors: ['Invalid email or password'], formData: req.body });
  }
  req.session.userId = user.id;
  req.session.userName = user.name;
  res.redirect('/jobs');
};

export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/jobs');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};
