const { google } = require('googleapis');
// const { refresh_token } = require('./token.json')
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost'
);

// // 1ra parte
// generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = [
//   'https://www.googleapis.com/auth/analytics',
//   'https://www.googleapis.com/auth/analytics.edit',
//   'https://www.googleapis.com/auth/drive',
//   'https://www.googleapis.com/auth/spreadsheets'
// ];

// const url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',

//   // If you only need one scope you can pass it as a string
//   scope: scopes
// });
// console.log(url)

// 2da parte
const code = process.env.CODE
console.log(code);
oauth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Error al obtener el token de acceso:', err);
    return;
  }
  console.log(tokens);
  const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;

  console.log('Token de acceso:', accessToken);
  console.log('Refresh token:', refreshToken);
});

// oauth2Client.setCredentials({
//   refresh_token
// });
// console.log(refresh_token);

// oauth2Client.getAccessToken()
//   .then((response) => {
//     const accessToken = response.res.data.access_token;
//     console.log('Token de acceso obtenido:', accessToken);
//   })
//   .catch((error) => {
//     console.error('Error al obtener el token de acceso:', error);
//   });
