import { getAppsData } from '../../lib/apps';

export default function handler(req, res) {
  const apps = getAppsData();
  res.status(200).json(apps);
} 