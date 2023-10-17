const { google } = require('googleapis');
const { refresh_token } = require('../token.json')
// require('dotenv').config();

// Instanciar cliente

// const scopes = [
//   'https://www.googleapis.com/auth/analytics',
//   'https://www.googleapis.com/auth/analytics.edit',
//   'https://www.googleapis.com/auth/drive',
//   'https://www.googleapis.com/auth/spreadsheets'
// ];

// const url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   scope: scopes
// });

//Generate URL to get CODE (this process is manual afther that code is saved in .env)
// console.log(url)
// const code = process.env.CODE

// Get refresh token (this process is manual, after that refresh token is saved in .env)
// oauth2Client.getToken(code, (err, tokens) => {
//   if (err) {
//     console.error('Error al obtener el token de acceso:', err);
//     return;
//   }

//   const accessToken = tokens.access_token;
//   const refreshToken = tokens.refresh_token;

//   console.log('Token de acceso:', accessToken);
//   console.log('Refresh token:', refreshToken);
// });



const getHeaders = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost'
  );
  oauth2Client.setCredentials({
    refresh_token
  });
  const { res } = await oauth2Client.getAccessToken();
  if( res.status != 200){
    console.log('error')
  }
  let token = res.data.access_token;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  return headers
  
}
module.exports = getHeaders