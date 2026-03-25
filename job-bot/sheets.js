'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { google } = require('googleapis');

async function getClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth.getClient();
}

async function appendRow(job, fitLevel, summary, tweakSuggestion) {
  const authClient = await getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const row = [
    job.title || '',
    fitLevel || '',
    job.companyName || '',
    summary || '',
    job.location || '',
    job.seniorityLevel || '',
    job.postedAt || '',
    job.applicantsCount || '',
    job.salary || '',
    job.link || '',
    job.applyUrl || '',
    job.descriptionText || '',
    tweakSuggestion || '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Sheet1',
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });
}

async function getExistingJobLinks() {
  const authClient = await getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Sheet1!J:J', // Job Post Link column
  });

  const rows = res.data.values || [];
  // Strip query params so tracking/refId differences don't cause false misses
  return new Set(rows.flat().filter(Boolean).map((url) => url.split('?')[0]));
}

module.exports = { appendRow, getExistingJobLinks };
