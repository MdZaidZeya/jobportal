export const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

export const ensureGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    res.redirect('/jobs');
  } else {
    next();
  }
};
