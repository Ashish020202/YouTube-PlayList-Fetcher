import { NextApiRequest, NextApiResponse } from 'next';
import { getPlaylists } from '../../utils/youtubeUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  console.log("from getplaylist",accessToken);
  
  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const playlists = await getPlaylists(accessToken);
  res.status(200).json(playlists);
}
