import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   'https://you-tube-play-list-fetcher-6gyq.vercel.app/api/auth/demo' 
  );

  const { code } = req.query;

  if (code) {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    console.log("token",tokens);
    res.redirect(`/listpage?token=${tokens.access_token}`);
    
    res.status(200).json(tokens);
  } else {
    res.status(400).json({ message: 'Authorization code not provided' });
  }
}
