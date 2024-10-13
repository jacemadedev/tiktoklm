import { TwitterApi } from 'twitter-api-v2';

const X_API_KEY = process.env.X_API_KEY;
const X_API_SECRET = process.env.X_API_SECRET;
const X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;
const X_ACCESS_SECRET = process.env.X_ACCESS_SECRET;

const xClient = new TwitterApi({
  appKey: X_API_KEY,
  appSecret: X_API_SECRET,
  accessToken: X_ACCESS_TOKEN,
  accessSecret: X_ACCESS_SECRET,
});

export const postToX = async (content: string) => {
  try {
    const tweet = await xClient.v2.tweet(content);
    return tweet.data.id;
  } catch (error) {
    console.error('Error posting to X:', error);
    throw error;
  }
};