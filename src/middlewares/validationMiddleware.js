export const validateJob = (req, res, next) => {
  const { title, description, location, salary } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  if (!description || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  if (!location || location.trim().length < 2) {
    errors.push('Location must be at least 2 characters long');
  }
  if (!salary || isNaN(salary) || salary <= 0) {
    errors.push('Salary must be a positive number');
  }

  if (errors.length > 0) {
    return res.render('newJob', { errors, title: 'Create New Job', formData: req.body });
  }
  next();
};

export const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  if (!email || !email.includes('@')) {
    errors.push('Please provide a valid email');
  }
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.render('register', { errors, title: 'Register', formData: req.body });
  }
  next();
};
