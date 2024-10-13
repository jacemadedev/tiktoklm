import { PrismaClient } from '@prisma/client';
import { fetchTikTokVideoData } from './tiktokApi';
import { postToX } from './xApi';

const prisma = new PrismaClient();

export const runBackgroundJob = async () => {
  try {
    const accounts = await prisma.tikTokAccount.findMany();
    const milestones = await prisma.engagementMilestone.findMany();

    for (const account of accounts) {
      const videos = await fetchTikTokVideoData(account.username);

      for (const video of videos) {
        for (const milestone of milestones) {
          if (video[milestone.metric] >= milestone.threshold) {
            const content = `🚀 @${account.username}'s TikTok video has reached ${video[milestone.metric]} ${milestone.metric}! Check it out: https://www.tiktok.com/@${account.username}/video/${video.id}`;
            
            const tweetId = await postToX(content);
            
            await prisma.scheduledPost.create({
              data: {
                tiktokUrl: `https://www.tiktok.com/@${account.username}/video/${video.id}`,
                scheduledTime: new Date(),
                status: 'posted',
              },
            });

            console.log(`Posted to X: ${content}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in background job:', error);
  }
};