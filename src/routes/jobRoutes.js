import express from 'express';
import {
  showJobs,
  showJobDetails,
  showNewJob,
  createNewJob,
  showUpdateJob,
  updateExistingJob,
  deleteExistingJob,
  showApplicants,
  applyForJob
} from '../controllers/jobController.js';

import { ensureAuthenticated } from '../middlewares/authMiddleware.js';
import { validateJob } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', showJobs);
router.get('/new', ensureAuthenticated, showNewJob);
router.post('/', ensureAuthenticated, validateJob, createNewJob);
router.get('/:id', showJobDetails);
router.get('/:id/update', ensureAuthenticated, showUpdateJob);
router.post('/:id/update', ensureAuthenticated, validateJob, updateExistingJob);
router.get('/:id/delete', ensureAuthenticated, deleteExistingJob);
router.get('/:id/applicants', ensureAuthenticated, showApplicants);
router.post('/apply/:id', upload.single('resume'), applyForJob);

export default router;
