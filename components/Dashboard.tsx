"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TikTokAccountList from './TikTokAccountList';
import EngagementMilestones from './EngagementMilestones';
import ScheduledPosts from './ScheduledPosts';

export default function Dashboard() {
  const [tiktokAccounts, setTiktokAccounts] = useState<any[]>([]);
  const [newAccount, setNewAccount] = useState('');
  const [isJobRunning, setIsJobRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTikTokAccounts();
  }, []);

  const fetchTikTokAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tiktok-accounts');
      if (!response.ok) {
        throw new Error('Failed to fetch TikTok accounts');
      }
      const data = await response.json();
      setTiktokAccounts(data);
    } catch (error) {
      console.error('Error fetching TikTok accounts:', error);
      setError('Failed to load TikTok accounts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addTikTokAccount = async () => {
    if (newAccount && !tiktokAccounts.some(account => account.username === newAccount)) {
      try {
        const response = await fetch('/api/tiktok-accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: newAccount }),
        });
        if (!response.ok) {
          throw new Error('Failed to add TikTok account');
        }
        fetchTikTokAccounts();
        setNewAccount('');
      } catch (error) {
        console.error('Error adding TikTok account:', error);
        setError('Failed to add TikTok account. Please try again.');
      }
    }
  };

  const triggerBackgroundJob = async () => {
    setIsJobRunning(true);
    setError(null);
    try {
      const response = await fetch('/api/trigger-job', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to trigger background job');
      }
      console.log('Background job triggered successfully');
    } catch (error) {
      console.error('Error triggering background job:', error);
      setError('Failed to trigger background job. Please try again.');
    } finally {
      setIsJobRunning(false);
    }
  };

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <Tabs defaultValue="accounts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="accounts">TikTok Accounts</TabsTrigger>
        <TabsTrigger value="milestones">Engagement Milestones</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled Posts</TabsTrigger>
      </TabsList>
      <TabsContent value="accounts">
        <Card>
          <CardHeader>
            <CardTitle>Monitored TikTok Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Enter TikTok username"
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
              />
              <Button onClick={addTikTokAccount}>Add Account</Button>
            </div>
            <TikTokAccountList accounts={tiktokAccounts} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="milestones">
        <EngagementMilestones />
      </TabsContent>
      <TabsContent value="scheduled">
        <ScheduledPosts />
      </TabsContent>
      <div className="mt-4">
        <Button onClick={triggerBackgroundJob} disabled={isJobRunning}>
          {isJobRunning ? 'Running...' : 'Trigger Background Job'}
        </Button>
      </div>
    </Tabs>
  );
}