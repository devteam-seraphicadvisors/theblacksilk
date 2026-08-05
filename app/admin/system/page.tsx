"use client";

import { useState, useEffect } from "react";
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
  Activity,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Globe,
  Mail,
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  icon: any;
  trend?: string;
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  responseTime: number;
  uptime: number;
  lastChecked: string;
}

export default function SystemHealthPage() {
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setLastRefresh(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  const systemMetrics: SystemMetric[] = [
    {
      name: "CPU Usage",
      value: 45,
      unit: "%",
      status: "healthy",
      icon: Cpu,
      trend: "+2.3%",
    },
    {
      name: "Memory Usage",
      value: 62,
      unit: "%",
      status: "healthy",
      icon: Activity,
      trend: "+5.1%",
    },
    {
      name: "Disk Usage",
      value: 78,
      unit: "%",
      status: "warning",
      icon: HardDrive,
      trend: "+8.2%",
    },
    {
      name: "Network Traffic",
      value: 34,
      unit: "Mbps",
      status: "healthy",
      icon: Wifi,
      trend: "-3.4%",
    },
  ];

  const services: ServiceStatus[] = [
    {
      name: "Database",
      status: "operational",
      responseTime: 12,
      uptime: 99.99,
      lastChecked: "2 min ago",
    },
    {
      name: "API Server",
      status: "operational",
      responseTime: 45,
      uptime: 99.95,
      lastChecked: "1 min ago",
    },
    {
      name: "Authentication",
      status: "operational",
      responseTime: 23,
      uptime: 99.98,
      lastChecked: "3 min ago",
    },
    {
      name: "Email Service",
      status: "operational",
      responseTime: 156,
      uptime: 99.92,
      lastChecked: "5 min ago",
    },
    {
      name: "File Storage",
      status: "operational",
      responseTime: 89,
      uptime: 99.97,
      lastChecked: "2 min ago",
    },
    {
      name: "Payment Gateway",
      status: "operational",
      responseTime: 234,
      uptime: 99.85,
      lastChecked: "4 min ago",
    },
  ];

  const recentIncidents = [
    {
      id: 1,
      severity: "low",
      title: "Scheduled Database Maintenance",
      description: "Routine maintenance completed successfully",
      timestamp: "2 hours ago",
      resolved: true,
    },
    {
      id: 2,
      severity: "medium",
      title: "Elevated API Response Times",
      description: "Response times returned to normal after load balancing",
      timestamp: "1 day ago",
      resolved: true,
    },
    {
      id: 3,
      severity: "low",
      title: "Email Service Delay",
      description: "Minor delay in email delivery, now resolved",
      timestamp: "3 days ago",
      resolved: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
      case "healthy":
        return "text-green-600 bg-green-50 border-green-200";
      case "degraded":
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "down":
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "degraded":
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "down":
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
            <p className="text-gray-600">Real-time system monitoring</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600">
            Monitor system performance and service status
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Last updated: {lastRefresh.toLocaleTimeString()}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  All Systems Operational
                </h3>
                <p className="text-gray-600">
                  All services are running normally
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-green-600 border-green-200 bg-green-50 px-4 py-2 text-lg"
            >
              99.98% Uptime
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value}
                  {metric.unit}
                </div>
                <Progress
                  value={metric.value}
                  className={`mt-2 ${
                    metric.status === "critical"
                      ? "bg-red-100 [&>div]:bg-red-600"
                      : metric.status === "warning"
                      ? "bg-yellow-100 [&>div]:bg-yellow-600"
                      : "bg-green-100 [&>div]:bg-green-600"
                  }`}
                />
                <div className="flex items-center justify-between mt-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(metric.status)}
                  >
                    {metric.status}
                  </Badge>
                  {metric.trend && (
                    <span
                      className={`text-xs ${
                        metric.trend.startsWith("+")
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {metric.trend}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="h-5 w-5 mr-2 text-blue-600" />
            Service Status
          </CardTitle>
          <CardDescription>
            Real-time status of all platform services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">
                      Last checked: {service.lastChecked}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {service.responseTime}ms
                    </p>
                    <p className="text-xs text-gray-600">Response Time</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {service.uptime}%
                    </p>
                    <p className="text-xs text-gray-600">Uptime</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(service.status)}
                  >
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Incidents
          </CardTitle>
          <CardDescription>
            System incidents and resolutions from the past 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentIncidents.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-gray-600">
                No incidents reported in the past 7 days
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge
                          variant="outline"
                          className={getSeverityColor(incident.severity)}
                        >
                          {incident.severity}
                        </Badge>
                        {incident.resolved && (
                          <Badge
                            variant="outline"
                            className="text-green-600 bg-green-50 border-green-200"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {incident.timestamp}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {incident.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {incident.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Database Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Run routine database optimization and cleanup
            </p>
            <Button variant="outline" className="w-full">
              <Database className="h-4 w-4 mr-2" />
              Run Maintenance
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Clear Cache</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Clear application cache to free up memory
            </p>
            <Button variant="outline" className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View detailed system logs and error reports
            </p>
            <Button variant="outline" className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              View Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
