import { createJob, getAllJobs, findJobById, updateJob, deleteJob, addApplicant, getApplicants } from '../models/Job.js';
import { sendConfirmationEmail } from '../middlewares/emailMiddleware.js';

export const showJobs = (req, res) => {
  let jobs = getAllJobs();
  const search = req.query.search;
  if (search) {
    jobs = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(jobs.length / limit);

  jobs = paginatedJobs.map(job => ({
    ...job,
    isOwner: req.session.userId && job.recruiterId === req.session.userId
  }));

  res.render('jobs', {
    title: 'Job Listings',
    jobs,
    user: req.session.userName,
    search,
    currentPage: page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  });
};

export const showJobDetails = (req, res) => {
  const job = findJobById(req.params.id);
  if (!job) {
    return res.status(404).render('404', { title: 'Job Not Found' });
  }
  res.render('jobDetails', { title: job.title, job, user: req.session.userName });
};

export const showNewJob = (req, res) => {
  res.render('newJob', { title: 'Create New Job', errors: [], formData: {} });
};

export const createNewJob = (req, res) => {
  const { title, description, location, salary } = req.body;
  const job = createJob(title, description, location, parseFloat(salary), req.session.userId);
  res.redirect('/jobs');
};

export const showUpdateJob = (req, res) => {
  const job = findJobById(req.params.id);
  if (!job || job.recruiterId !== req.session.userId) {
    return res.status(403).render('404', { title: 'Access Denied' });
  }
  res.render('updateJob', { title: 'Update Job', job, errors: [], formData: job });
};

export const updateExistingJob = (req, res) => {
  const job = findJobById(req.params.id);
  if (!job || job.recruiterId !== req.session.userId) {
    return res.status(403).render('404', { title: 'Access Denied' });
  }
  const { title, description, location, salary } = req.body;
  updateJob(req.params.id, title, description, location, parseFloat(salary));
  res.redirect('/jobs');
};

export const deleteExistingJob = (req, res) => {
  const job = findJobById(req.params.id);
  if (!job || job.recruiterId !== req.session.userId) {
    return res.status(403).render('404', { title: 'Access Denied' });
  }
  deleteJob(req.params.id);
  res.redirect('/jobs');
};

export const showApplicants = (req, res) => {
  const job = findJobById(req.params.id);
  if (!job || job.recruiterId !== req.session.userId) {
    return res.status(403).render('404', { title: 'Access Denied' });
  }
  let applicants = getApplicants(req.params.id);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedApplicants = applicants.slice(startIndex, endIndex);
  const totalPages = Math.ceil(applicants.length / limit);

  res.render('applicants', {
    title: 'Applicants',
    job,
    applicants: paginatedApplicants,
    currentPage: page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  });
};

export const applyForJob = (req, res) => {
  const { name, email, contact } = req.body;
  const resumePath = req.file ? req.file.path : null;
  const applicant = addApplicant(req.params.id, name, email, contact, resumePath);
  if (applicant) {
    const job = findJobById(req.params.id);
    sendConfirmationEmail(email, name, job.title);
  }
  res.redirect(`/jobs/${req.params.id}`);
};
