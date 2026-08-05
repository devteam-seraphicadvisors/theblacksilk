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
import { Progress } from "@/components/ui/progress";
import {
  Database,
  HardDrive,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  Server,
} from "lucide-react";

export default function DatabasePage() {
  const [loading, setLoading] = useState(false);

  const handleBackup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Database backup completed successfully");
    }, 2000);
  };

  const databaseStats = [
    { label: "Total Records", value: "45,892", icon: FileText },
    { label: "Database Size", value: "2.4 GB", icon: HardDrive },
    { label: "Tables", value: "28", icon: Database },
    { label: "Last Backup", value: "2 hours ago", icon: CheckCircle },
  ];

  const tables = [
    { name: "User", records: 449, size: "234 MB", status: "healthy" },
    { name: "Event", records: 87, size: "156 MB", status: "healthy" },
    {
      name: "EventRegistration",
      records: 1245,
      size: "89 MB",
      status: "healthy",
    },
    { name: "Publication", records: 234, size: "567 MB", status: "healthy" },
    { name: "Committee", records: 12, size: "45 MB", status: "healthy" },
    { name: "Membership", records: 389, size: "123 MB", status: "healthy" },
    { name: "Newsletter", records: 678, size: "67 MB", status: "healthy" },
    { name: "Job", records: 34, size: "23 MB", status: "healthy" },
  ];

  const backupHistory = [
    {
      id: "1",
      date: "2025-11-30 08:00:00",
      size: "2.4 GB",
      type: "Automatic",
      status: "completed",
    },
    {
      id: "2",
      date: "2025-11-29 08:00:00",
      size: "2.3 GB",
      type: "Automatic",
      status: "completed",
    },
    {
      id: "3",
      date: "2025-11-28 08:00:00",
      size: "2.3 GB",
      type: "Automatic",
      status: "completed",
    },
    {
      id: "4",
      date: "2025-11-27 15:30:00",
      size: "2.2 GB",
      type: "Manual",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Database Management
          </h1>
          <p className="text-gray-600">
            Manage database backups, optimization, and monitoring
          </p>
        </div>
        <Button onClick={handleBackup} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Creating Backup...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Create Backup
            </>
          )}
        </Button>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {databaseStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="h-5 w-5 mr-2 text-blue-600" />
            Storage Usage
          </CardTitle>
          <CardDescription>Current database storage allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  Used Storage
                </span>
                <span className="text-sm text-gray-600">2.4 GB / 10 GB</span>
              </div>
              <Progress value={24} className="h-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">24%</p>
                <p className="text-sm text-gray-600">Used</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">76%</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">+8%</p>
                <p className="text-sm text-gray-600">Growth (30d)</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">~245</p>
                <p className="text-sm text-gray-600">Days Until Full</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Tables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-green-600" />
            Database Tables
          </CardTitle>
          <CardDescription>
            Overview of all database tables and their sizes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tables.map((table) => (
              <div
                key={table.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">{table.name}</p>
                    <p className="text-sm text-gray-600">
                      {table.records.toLocaleString()} records
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">
                    {table.size}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200 bg-green-50"
                  >
                    {table.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup & Restore */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="h-5 w-5 mr-2 text-purple-600" />
              Backup History
            </CardTitle>
            <CardDescription>Recent database backups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backupHistory.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {new Date(backup.date).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {backup.type} • {backup.size}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 bg-green-50"
                    >
                      {backup.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-orange-600" />
              Database Operations
            </CardTitle>
            <CardDescription>
              Maintenance and optimization tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Optimize Database
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Restore from Backup
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clean Old Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Automated Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Backup Configuration</CardTitle>
          <CardDescription>
            Configure automatic database backup schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Daily Backups Enabled
                  </p>
                  <p className="text-sm text-gray-600">
                    Automatically backs up database every day at 8:00 AM
                  </p>
                </div>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Frequency</p>
                <p className="text-lg font-semibold text-gray-900">Daily</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Retention</p>
                <p className="text-lg font-semibold text-gray-900">30 Days</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Storage Location</p>
                <p className="text-lg font-semibold text-gray-900">Cloud</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
