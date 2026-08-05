"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Camera, Save, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [showMfaSetup, setShowMfaSetup] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [mfaToken, setMfaToken] = useState("")

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    organization: "",
    position: "",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
  })

  useEffect(() => {
    if (session?.user) {
      setProfile((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }))
    }
  }, [session])

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        setMessage("Profile updated successfully!")
        await update()
      } else {
        setMessage("Failed to update profile")
      }
    } catch (error) {
      setMessage("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const setupMFA = async () => {
    try {
      const response = await fetch("/api/mfa/setup", { method: "POST" })
      const data = await response.json()

      if (response.ok) {
        setQrCode(data.qrCodeUrl)
        setShowMfaSetup(true)
      }
    } catch (error) {
      setMessage("Failed to setup MFA")
    }
  }

  const verifyMFA = async () => {
    try {
      const response = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: mfaToken }),
      })

      if (response.ok) {
        setMfaEnabled(true)
        setShowMfaSetup(false)
        setMessage("MFA enabled successfully!")
      } else {
        setMessage("Invalid MFA token")
      }
    } catch (error) {
      setMessage("Failed to verify MFA")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          {message && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="text-lg">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={profile.organization}
                        onChange={(e) => setProfile((prev) => ({ ...prev, organization: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        onChange={(e) => setProfile((prev) => ({ ...prev, position: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="mt-1"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => setProfile((prev) => ({ ...prev, linkedin: e.target.value }))}
                        className="mt-1"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => setProfile((prev) => ({ ...prev, twitter: e.target.value }))}
                        className="mt-1"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={loading} className="bg-black hover:bg-gray-800">
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                {/* MFA Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Two-Factor Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Multi-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={mfaEnabled ? "default" : "secondary"}>
                          {mfaEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                        <Switch
                          checked={mfaEnabled}
                          onCheckedChange={(checked) => {
                            if (checked && !mfaEnabled) {
                              setupMFA()
                            }
                          }}
                        />
                      </div>
                    </div>

                    {showMfaSetup && (
                      <div className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium">Setup Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">
                          Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
                        </p>

                        {qrCode && (
                          <div className="flex justify-center">
                            <Image src={qrCode || "/placeholder.svg"} alt="MFA QR Code" width={200} height={200} />
                          </div>
                        )}

                        <div>
                          <Label htmlFor="mfaToken">Enter verification code</Label>
                          <Input
                            id="mfaToken"
                            value={mfaToken}
                            onChange={(e) => setMfaToken(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="mt-1"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={verifyMFA} className="bg-black hover:bg-gray-800">
                            Verify & Enable
                          </Button>
                          <Button variant="outline" onClick={() => setShowMfaSetup(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Password Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="mt-1" />
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { id: "events", label: "Event Notifications", description: "Get notified about upcoming events" },
                    {
                      id: "forum",
                      label: "Forum Activity",
                      description: "Notifications for forum replies and mentions",
                    },
                    { id: "newsletter", label: "Newsletter", description: "Weekly newsletter with latest insights" },
                    { id: "committees", label: "Committee Updates", description: "Updates from your committees" },
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{pref.label}</p>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
