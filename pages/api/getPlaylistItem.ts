import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playlistId } = req.query;
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,  // Authenticate with OAuth2 client
  });

  try {
    const response = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: playlistId as string,
      maxResults: 50,  // Adjust as needed
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
