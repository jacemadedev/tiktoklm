import axios from 'axios';

const TIKTOK_API_KEY = process.env.TIKTOK_API_KEY;
const TIKTOK_API_BASE_URL = 'https://open-api.tiktok.com/v2';

const tiktokApi = axios.create({
  baseURL: TIKTOK_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TIKTOK_API_KEY}`,
  },
});

export const fetchTikTokVideoData = async (username: string) => {
  try {
    const response = await tiktokApi.get(`/user/info/?fields=open_id,union_id,avatar_url&username=${username}`);
    const userId = response.data.user.open_id;
    
    const videosResponse = await tiktokApi.get(`/video/list/?fields=id,create_time,share_count,like_count,comment_count,view_count&user_id=${userId}`);
    return videosResponse.data.videos;
  } catch (error) {
    console.error('Error fetching TikTok data:', error);
    throw error;
  }
};