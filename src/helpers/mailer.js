import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const mailer = async (email, username) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(`The key`, process.env.SENDGRID_API_KEY, 'na email', email, 'na username', username);
  const msg = {
    to: `${email}`,
    from: 'girad4@gmail.com', // Use the email address or domain you verified above
    subject: 'Successfull Registration',
    text: `Dear ${username}, You have successfully been registered`,
    html: '<strong>You have successfully been registered</strong>',
  };
  try {
    const sent = await sgMail.send(msg);
    console.log(`successfully sent`, sent);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}
export default mailer;