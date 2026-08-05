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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Key,
  Lock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  UserCheck,
  Clock,
  Activity,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SecurityPage() {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    mfaEnabled: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
    ipWhitelist: false,
    apiRateLimit: "1000",
  });

  const securityLogs = [
    {
      id: "1",
      event: "Failed Login Attempt",
      user: "john@example.com",
      ip: "192.168.1.100",
      timestamp: "2025-11-30 10:45:23",
      severity: "warning",
    },
    {
      id: "2",
      event: "Password Changed",
      user: "admin@tbs.org",
      ip: "192.168.1.1",
      timestamp: "2025-11-30 09:12:45",
      severity: "info",
    },
    {
      id: "3",
      event: "MFA Enabled",
      user: "sarah@example.com",
      ip: "192.168.1.55",
      timestamp: "2025-11-29 16:30:10",
      severity: "info",
    },
    {
      id: "4",
      event: "Multiple Failed Login Attempts",
      user: "unknown@test.com",
      ip: "203.45.67.89",
      timestamp: "2025-11-29 14:22:33",
      severity: "critical",
    },
  ];

  const activeSessions = [
    {
      id: "1",
      user: "admin@tbs.org",
      ip: "192.168.1.1",
      device: "Chrome on Windows",
      location: "New York, US",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: "2",
      user: "admin@tbs.org",
      ip: "192.168.1.5",
      device: "Safari on macOS",
      location: "San Francisco, US",
      lastActive: "1 hour ago",
      current: false,
    },
  ];

  const getSeverityBadge = (severity: string) => {
    const config = {
      info: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
      critical: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
    };
    const { color, icon: Icon } =
      config[severity as keyof typeof config] || config.info;
    return (
      <Badge variant="outline" className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {severity}
      </Badge>
    );
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Security settings have been updated successfully",
    });
  };

  const handleRevokeSession = (sessionId: string) => {
    toast({
      title: "Session Revoked",
      description: "The user session has been terminated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Security & Access Control
          </h1>
          <p className="text-gray-600">
            Manage security settings and monitor system access
          </p>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Score
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85/100</div>
            <p className="text-xs text-gray-600 mt-1">Good</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600 mt-1">Current users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA Adoption</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-gray-600 mt-1">350/449 users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Logins (24h)
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-600 mt-1">3 blocked IPs</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2 text-blue-600" />
            Security Configuration
          </CardTitle>
          <CardDescription>
            Configure authentication and access control settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Multi-Factor Authentication (MFA)
              </p>
              <p className="text-sm text-gray-600">
                Require users to use 2FA for login
              </p>
            </div>
            <Switch
              checked={securitySettings.mfaEnabled}
              onCheckedChange={(checked) =>
                setSecuritySettings({
                  ...securitySettings,
                  mfaEnabled: checked,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">IP Whitelist</p>
              <p className="text-sm text-gray-600">
                Restrict admin access to specific IPs
              </p>
            </div>
            <Switch
              checked={securitySettings.ipWhitelist}
              onCheckedChange={(checked) =>
                setSecuritySettings({
                  ...securitySettings,
                  ipWhitelist: checked,
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    sessionTimeout: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    passwordExpiry: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    loginAttempts: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiRateLimit">
                API Rate Limit (requests/hour)
              </Label>
              <Input
                id="apiRateLimit"
                type="number"
                value={securitySettings.apiRateLimit}
                onChange={(e) =>
                  setSecuritySettings({
                    ...securitySettings,
                    apiRateLimit: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSaveSettings}>
              <Shield className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2 text-purple-600" />
            API Keys & Tokens
          </CardTitle>
          <CardDescription>
            Manage API keys for external integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">
                    Production API Key
                  </p>
                  <p className="text-sm text-gray-600">
                    Created on Nov 15, 2025
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50"
                >
                  Active
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type={showApiKey ? "text" : "password"}
                  value={process.env.STRIPE_LIVE_KEY || "••••••••••••••••••••••••"}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">Test API Key</p>
                  <p className="text-sm text-gray-600">
                    Created on Nov 10, 2025
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50"
                >
                  Active
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="password"
                  value={process.env.STRIPE_SECRET_KEY || "••••••••••••••••••••••••"}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Key className="h-4 w-4 mr-2" />
              Generate New API Key
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-600" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Monitor and manage active user sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg border ${
                  session.current
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-medium text-gray-900">
                        {session.user}
                      </p>
                      {session.current && (
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200"
                        >
                          Current Session
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>IP: {session.ip}</div>
                      <div>Device: {session.device}</div>
                      <div>Location: {session.location}</div>
                      <div>Last Active: {session.lastActive}</div>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-600" />
            Security Activity Log
          </CardTitle>
          <CardDescription>Recent security events and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getSeverityBadge(log.severity)}
                    <p className="font-medium text-gray-900">{log.event}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>User: {log.user}</div>
                    <div>IP: {log.ip}</div>
                    <div>Time: {log.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Security Logs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
