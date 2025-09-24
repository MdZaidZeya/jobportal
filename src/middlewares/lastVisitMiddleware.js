export const trackLastVisit = (req, res, next) => {
  const lastVisit = req.cookies.lastVisit;
  res.locals.lastVisit = lastVisit ? new Date(lastVisit).toLocaleString() : 'First visit';
  res.cookie('lastVisit', new Date().toISOString(), { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
  next();
};
