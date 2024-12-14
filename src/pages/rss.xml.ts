import { generateRSSFeed } from '../utils/rss';

export const GET = async (context: any) => {
  return generateRSSFeed(context);
};