import { google } from 'googleapis';

export const getPlaylists = async (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  const response = await youtube.playlists.list({
    part: ['snippet', 'contentDetails'],
    mine: true,
    maxResults: 10,
  });

  return response.data;
};
