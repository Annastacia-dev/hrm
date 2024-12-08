'use client';

import { useState, useContext } from 'react';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  BarChart,
  CheckCircle,
  MessageSquare,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react';
import UserContext from '@/contexts/user';

export default function PerformanceDashboard() {
  const { currentUser } = useContext(UserContext);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Performance Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and goals</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Employee"
          />
           <AvatarFallback>
              {currentUser?.first_name[0].toUpperCase()}
              {currentUser?.last_name[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Goals Completed
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7/10</div>
            <Progress value={70} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Feedback Score
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5/5</div>
            <div className="flex mt-2">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-primary text-primary"
                />
              ))}
              <Star
                className="h-4 w-4 fill-primary text-primary"
                strokeWidth={3}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Skills Improved
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3</div>
            <p className="text-xs text-muted-foreground mt-2">
              Communication, Leadership, Problem Solving
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Goals</CardTitle>
          <CardDescription>
            Your progress on assigned objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Complete project X</p>
                  <Badge>Completed</Badge>
                </div>
                <Progress value={100} className="mt-2" />
              </div>
            </div>
            <div className="flex items-center">
              <Target className="h-5 w-5 text-blue-500 mr-2" />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-medium">
                    Improve customer satisfaction score
                  </p>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                <Progress value={75} className="mt-2" />
              </div>
            </div>
            <div className="flex items-center">
              <Target className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Learn new technology stack</p>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                <Progress value={30} className="mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>
            Comments from your manager and peers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Manager"
                />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">Manager Feedback</p>
                <p className="text-sm text-muted-foreground">
                  Great job on the last project. Your leadership skills have
                  really improved. Keep up the good work!
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Peer"
                />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">Peer Review</p>
                <p className="text-sm text-muted-foreground">
                  Always a pleasure working with you. Your problem-solving
                  skills are top-notch.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Textarea
              placeholder="Add your self-reflection or request feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" /> Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
