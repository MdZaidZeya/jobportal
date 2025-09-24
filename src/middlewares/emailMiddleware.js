import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (applicantEmail, applicantName, jobTitle) => {
  // Configure transporter (use your email service credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com', // Replace with your email
      pass: 'your_email_password'   // Replace with your email password or app password
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: applicantEmail,
    subject: `Application Confirmation for ${jobTitle}`,
    text: `Dear ${applicantName},\n\nThank you for applying to the position of ${jobTitle}. We have received your application.\n\nBest regards,\nJob Portal Team`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
