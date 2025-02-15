import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   'https://you-tube-play-list-fetcher-6gyq.vercel.app/api/auth/demo'
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.readonly'],
  });
  res.redirect(url);
}
