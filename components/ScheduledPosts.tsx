"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ScheduledPost {
  id: number;
  tiktokUrl: string;
  scheduledTime: string;
  status: string;
}

export default function ScheduledPosts() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  const fetchScheduledPosts = async () => {
    const response = await fetch('/api/scheduled-posts');
    const data = await response.json();
    setScheduledPosts(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TikTok URL</TableHead>
              <TableHead>Scheduled Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.tiktokUrl}</TableCell>
                <TableCell>{new Date(post.scheduledTime).toLocaleString()}</TableCell>
                <TableCell>{post.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}