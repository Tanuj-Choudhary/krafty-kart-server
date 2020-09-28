const nodemailer = require('nodemailer');
const oAuth2Client = require('./oAuth2Client');

const accessToken = oAuth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.OAUTH_EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

module.exports = smtpTransport;
