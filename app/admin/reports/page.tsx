"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  Filter,
  Eye,
  DollarSign,
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  lastGenerated: string;
  downloads: number;
  size: string;
}

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");

  const reports: Report[] = [
    {
      id: "1",
      name: "User Engagement Report",
      description: "Detailed analysis of user activity and engagement metrics",
      type: "Analytics",
      category: "users",
      lastGenerated: "2025-11-29",
      downloads: 23,
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Event Performance Report",
      description: "Comprehensive overview of event attendance and feedback",
      type: "Events",
      category: "events",
      lastGenerated: "2025-11-28",
      downloads: 45,
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Membership Revenue Report",
      description: "Financial summary of membership subscriptions and revenue",
      type: "Financial",
      category: "finance",
      lastGenerated: "2025-11-27",
      downloads: 67,
      size: "3.2 MB",
    },
    {
      id: "4",
      name: "Content Analytics Report",
      description: "Analysis of publication views, downloads, and engagement",
      type: "Content",
      category: "content",
      lastGenerated: "2025-11-26",
      downloads: 34,
      size: "2.1 MB",
    },
    {
      id: "5",
      name: "Committee Activity Report",
      description: "Overview of committee activities and member participation",
      type: "Committees",
      category: "committees",
      lastGenerated: "2025-11-25",
      downloads: 18,
      size: "1.5 MB",
    },
    {
      id: "6",
      name: "System Usage Report",
      description: "Technical metrics and system performance statistics",
      type: "System",
      category: "system",
      lastGenerated: "2025-11-24",
      downloads: 12,
      size: "4.3 MB",
    },
  ];

  const quickReports = [
    {
      name: "New Members This Month",
      value: "89",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Events This Quarter",
      value: "24",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Total Revenue (30d)",
      value: "$12,450",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Publication Views",
      value: "15.2K",
      icon: Eye,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const filteredReports =
    selectedCategory === "all"
      ? reports
      : reports.filter((r) => r.category === selectedCategory);

  const handleGenerateReport = (reportId: string) => {
    alert(`Generating report: ${reportId}`);
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading report: ${reportId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">
            Generate and download platform analytics reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickReports.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Categories */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Select a category to view and generate reports
              </CardDescription>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="committees">Committees</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {report.name}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {report.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {report.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Generated:</span>
                      <span className="font-medium">
                        {new Date(report.lastGenerated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Downloads:</span>
                      <span className="font-medium">{report.downloads}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{report.size}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleGenerateReport(report.id)}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownloadReport(report.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2 text-purple-600" />
            Custom Report Builder
          </CardTitle>
          <CardDescription>
            Create custom reports with specific metrics and date ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="memberships">Memberships</SelectItem>
                <SelectItem value="publications">Publications</SelectItem>
                <SelectItem value="committees">Committees</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select metrics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">Growth Rate</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="activity">Activity</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Generate Custom Report
          </Button>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>
            Automatically generated reports sent to specified recipients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">
                  Weekly User Analytics
                </p>
                <p className="text-sm text-gray-600">
                  Sent every Monday at 9:00 AM to admin@tbs.org
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-green-600 border-green-200 bg-green-50"
              >
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">
                  Monthly Financial Summary
                </p>
                <p className="text-sm text-gray-600">
                  Sent on 1st of every month at 8:00 AM to finance@tbs.org
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-green-600 border-green-200 bg-green-50"
              >
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">
                  Quarterly Performance Report
                </p>
                <p className="text-sm text-gray-600">
                  Sent every quarter to leadership@tbs.org
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-gray-600 border-gray-200"
              >
                Paused
              </Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Manage Scheduled Reports
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
