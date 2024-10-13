"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Milestone {
  id: number;
  metric: string;
  threshold: number;
}

export default function EngagementMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMetric, setNewMetric] = useState('');
  const [newThreshold, setNewThreshold] = useState('');

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    const response = await fetch('/api/engagement-milestones');
    const data = await response.json();
    setMilestones(data);
  };

  const addMilestone = async () => {
    if (newMetric && newThreshold) {
      const response = await fetch('/api/engagement-milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metric: newMetric, threshold: parseInt(newThreshold, 10) }),
      });
      if (response.ok) {
        fetchMilestones();
        setNewMetric('');
        setNewThreshold('');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="metric">Metric</Label>
            <Input
              id="metric"
              placeholder="e.g., Views, Likes"
              value={newMetric}
              onChange={(e) => setNewMetric(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="threshold">Threshold</Label>
            <Input
              id="threshold"
              type="number"
              placeholder="e.g., 1000000"
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addMilestone}>Add Milestone</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Threshold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.id}>
                <TableCell>{milestone.metric}</TableCell>
                <TableCell>{milestone.threshold.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}