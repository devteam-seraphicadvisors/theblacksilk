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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  Globe,
  Mail,
  Bell,
  CreditCard,
  Users,
  Calendar,
  FileText,
  Palette,
  Save,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "The Black Silk",
    siteDescription: "Legal Technology Platform",
    siteUrl: "https://theblacksilk.org",
    adminEmail: "admin@theblacksilk.org",
    supportEmail: "support@theblacksilk.org",
    timezone: "America/New_York",
    language: "en",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "notifications@theblacksilk.org",
    smtpPassword: "********",
    fromName: "The Black Silk",
    fromEmail: "noreply@theblacksilk.org",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    eventReminders: true,
    membershipAlerts: true,
    systemUpdates: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "••••••••••••••••",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "••••••••••••••••",
    razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "••••••••••••••••",
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || "••••••••••••••••",
    currency: "USD",
    taxRate: "0",
  });

  const handleSaveSettings = async (section: string) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">
            Configure platform settings and preferences
          </p>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            General Settings
          </CardTitle>
          <CardDescription>Basic platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={generalSettings.siteName}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    siteName: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={generalSettings.siteUrl}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    siteUrl: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={generalSettings.siteDescription}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  siteDescription: e.target.value,
                })
              }
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={generalSettings.adminEmail}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    adminEmail: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={generalSettings.supportEmail}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    supportEmail: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={generalSettings.timezone}
                onValueChange={(value) =>
                  setGeneralSettings({ ...generalSettings, timezone: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">
                    Eastern Time (ET)
                  </SelectItem>
                  <SelectItem value="America/Chicago">
                    Central Time (CT)
                  </SelectItem>
                  <SelectItem value="America/Denver">
                    Mountain Time (MT)
                  </SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    Pacific Time (PT)
                  </SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={generalSettings.language}
                onValueChange={(value) =>
                  setGeneralSettings({ ...generalSettings, language: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => handleSaveSettings("General")}
              disabled={saving}
            >
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save General Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-green-600" />
            Email Configuration
          </CardTitle>
          <CardDescription>SMTP and email delivery settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={emailSettings.smtpHost}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    smtpHost: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={emailSettings.smtpPort}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    smtpPort: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input
                id="smtpUser"
                value={emailSettings.smtpUser}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    smtpUser: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    smtpPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={emailSettings.fromName}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    fromName: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) =>
                  setEmailSettings({
                    ...emailSettings,
                    fromEmail: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
            <Button
              onClick={() => handleSaveSettings("Email")}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Email Settings
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-purple-600" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure notification channels and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Send notifications via email
                </p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">
                  Send browser push notifications
                </p>
              </div>
              <Switch
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    pushNotifications: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Send SMS text messages</p>
              </div>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    smsNotifications: checked,
                  })
                }
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="font-medium text-gray-900 mb-3">
                Notification Types
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="eventReminders">Event Reminders</Label>
                  <Switch
                    id="eventReminders"
                    checked={notificationSettings.eventReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        eventReminders: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="membershipAlerts">Membership Alerts</Label>
                  <Switch
                    id="membershipAlerts"
                    checked={notificationSettings.membershipAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        membershipAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="systemUpdates">System Updates</Label>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        systemUpdates: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => handleSaveSettings("Notification")}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-yellow-600" />
            Payment Configuration
          </CardTitle>
          <CardDescription>
            Payment gateway and pricing settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Be careful when modifying payment
              settings. Incorrect configuration may affect transactions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
              <Input
                id="stripePublicKey"
                value={paymentSettings.stripePublicKey}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    stripePublicKey: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
              <Input
                id="stripeSecretKey"
                type="password"
                value={paymentSettings.stripeSecretKey}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    stripeSecretKey: e.target.value,
                  })
                }
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="font-medium text-gray-900 mb-3">Razorpay</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="razorpayKeyId">Razorpay Key ID</Label>
                  <Input
                    id="razorpayKeyId"
                    value={paymentSettings.razorpayKeyId}
                    onChange={(e) =>
                      setPaymentSettings({
                        ...paymentSettings,
                        razorpayKeyId: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razorpayKeySecret">Razorpay Key Secret</Label>
                  <Input
                    id="razorpayKeySecret"
                    type="password"
                    value={paymentSettings.razorpayKeySecret}
                    onChange={(e) =>
                      setPaymentSettings({
                        ...paymentSettings,
                        razorpayKeySecret: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={paymentSettings.currency}
                  onValueChange={(value) =>
                    setPaymentSettings({ ...paymentSettings, currency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={paymentSettings.taxRate}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      taxRate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => handleSaveSettings("Payment")}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Payment Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
