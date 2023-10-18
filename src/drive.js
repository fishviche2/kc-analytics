const { google } = require('googleapis');
require('dotenv').config();


const moveFileToFolder = async (fileId, headers) => {
  console.log(fileId)
  const folderId = process.env.FOLDER_ID;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: headers.Authorization.split(' ')[1]
  });
  
  const service = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const file = await service.files.get({
      fileId: fileId,
      fields: 'parents',
    });

    const previousParents = file.data.parents.join(',');
    const files = await service.files.update({
      fileId: fileId,
      addParents: folderId,
      removeParents: previousParents,
      fields: 'id, parents',
    });

    console.log(files.status);
    return files.status;
  } catch (err) {
    console.error("Error al mover el archivo:", err);
  }
};

module.exports = moveFileToFolder

