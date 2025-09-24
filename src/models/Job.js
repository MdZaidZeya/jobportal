// In-memory data structure for jobs
let jobs = [];
let nextJobId = 1;
let nextApplicantId = 1;

class Job {
  constructor(id, title, description, location, salary, recruiterId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.salary = salary;
    this.recruiterId = recruiterId;
    this.applicants = [];
  }
}

class Applicant {
  constructor(id, name, email, contact, resumePath) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }
}

// Functions for job management
export const createJob = (title, description, location, salary, recruiterId) => {
  const job = new Job(nextJobId++, title, description, location, salary, recruiterId);
  jobs.push(job);
  return job;
};

export const getAllJobs = () => {
  return jobs;
};

export const findJobById = (id) => {
  return jobs.find(job => job.id === parseInt(id));
};

export const updateJob = (id, title, description, location, salary) => {
  const job = findJobById(id);
  if (job) {
    job.title = title;
    job.description = description;
    job.location = location;
    job.salary = salary;
    return job;
  }
  return null;
};

export const deleteJob = (id) => {
  const index = jobs.findIndex(job => job.id === parseInt(id));
  if (index !== -1) {
    return jobs.splice(index, 1)[0];
  }
  return null;
};

export const addApplicant = (jobId, name, email, contact, resumePath) => {
  const job = findJobById(jobId);
  if (job) {
    const applicant = new Applicant(nextApplicantId++, name, email, contact, resumePath);
    job.applicants.push(applicant);
    return applicant;
  }
  return null;
};

export const getApplicants = (jobId) => {
  const job = findJobById(jobId);
  return job ? job.applicants : [];
};

export default Job;
