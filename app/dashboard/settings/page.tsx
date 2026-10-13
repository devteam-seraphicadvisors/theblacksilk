"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUploader } from "@/components/dashboard/avatar-uploader";
import { Check, Eye, EyeOff, Loader2, Save, Trash2, Download } from "lucide-react";

// "Export your data" is hidden until the export feature exists.
const SHOW_DATA_EXPORT = false;

const BIO_MAX = 1000;

interface Profile {
  name: string | null;
  email: string;
  image: string | null;
  phone: string | null;
  organization: string | null;
  position: string | null;
  bio: string | null;
}

const labelClass = "block text-xs uppercase font-mono tracking-wider text-neutral-700 mb-2";
const inputClass = "rounded-none border-neutral-300 bg-white focus-visible:ring-black";
const panelClass = "bg-white border border-neutral-200 p-6 lg:p-8";
const switchClass = "data-[state=checked]:bg-black data-[state=unchecked]:bg-neutral-300";

function PanelHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6 pb-5 border-b border-neutral-200">
      <h2 className="text-2xl font-serif font-normal text-black">{title}</h2>
      {description && <p className="text-sm text-neutral-600 mt-1">{description}</p>}
    </div>
  );
}

function ToggleRow({
  name,
  description,
  defaultChecked,
}: {
  name: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-neutral-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-black">{name}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} className={switchClass} aria-label={name} />
    </div>
  );
}

function ProfileTab() {
  const { update } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    organization: "",
    position: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/user/profile")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load your profile.");
        return data as Profile;
      })
      .then((data) => {
        setProfile(data);
        const [firstName = "", ...rest] = (data.name || "").split(" ");
        setForm({
          firstName,
          lastName: rest.join(" "),
          phone: data.phone || "",
          organization: data.organization || "",
          position: data.position || "",
          bio: data.bio || "",
        });
      })
      .catch((e) => setLoadError(e.message));
  }, []);

  const set = (field: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setStatus(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    if (!name) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: form.phone,
          organization: form.organization,
          position: form.position,
          bio: form.bio,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save your changes.");
      setProfile(data);
      await update();
      setStatus({ type: "success", message: "Your profile has been saved." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Could not save your changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loadError) {
    return (
      <div className={panelClass}>
        <p className="text-sm text-red-600" role="alert">
          {loadError}
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`${panelClass} flex items-center gap-3 text-neutral-500`}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading your profile…</span>
      </div>
    );
  }

  const displayName = `${form.firstName} ${form.lastName}`.trim();

  return (
    <div className="space-y-6">
      <section className={panelClass}>
        <PanelHeader
          title="Profile Picture"
          description="Shown on your profile, in the dashboard, and across the community."
        />
        <AvatarUploader
          image={profile.image}
          name={displayName}
          onChange={(image) => setProfile((p) => (p ? { ...p, image } : p))}
        />
      </section>

      <form onSubmit={handleSubmit} className={panelClass}>
        <PanelHeader title="Profile Information" description="Keep your details up to date." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name *
            </label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => set("firstName")(e.target.value)}
              required
              maxLength={50}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => set("lastName")(e.target.value)}
              maxLength={50}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              readOnly
              className={`${inputClass} bg-neutral-50 text-neutral-500 cursor-not-allowed`}
            />
            <p className="text-xs text-neutral-500 mt-1.5">
              Used to sign in. Contact us to change it.
            </p>
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              maxLength={30}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="organization" className={labelClass}>
              Organization
            </label>
            <Input
              id="organization"
              value={form.organization}
              onChange={(e) => set("organization")(e.target.value)}
              maxLength={150}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="position" className={labelClass}>
              Position
            </label>
            <Input
              id="position"
              value={form.position}
              onChange={(e) => set("position")(e.target.value)}
              maxLength={150}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="bio" className={labelClass}>
            Bio
          </label>
          <Textarea
            id="bio"
            rows={5}
            value={form.bio}
            onChange={(e) => set("bio")(e.target.value)}
            maxLength={BIO_MAX}
            placeholder="Tell the community about your background and interests…"
            className={`${inputClass} resize-y`}
          />
          <p className="text-xs text-neutral-500 mt-1.5 text-right">
            {form.bio.length}/{BIO_MAX}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-black !text-white hover:bg-neutral-800 disabled:opacity-60 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {status && (
            <p
              role="status"
              className={`flex items-center gap-1.5 text-sm ${
                status.type === "success" ? "text-black" : "text-red-600"
              }`}
            >
              {status.type === "success" && <Check className="h-4 w-4" />}
              {status.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-5xl">
      {/* Page heading */}
      <div>
        <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
          Account
        </span>
        <h1 className="text-3xl lg:text-4xl font-serif font-normal text-black tracking-tight">
          Settings
        </h1>
        <p className="text-neutral-600 mt-2">
          Manage your profile, notifications, and account preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="h-auto w-full justify-start gap-8 rounded-none bg-transparent border-b border-neutral-200 p-0 overflow-x-auto">
          {[
            ["profile", "Profile"],
            ["notifications", "Notifications"],
            ["privacy", "Privacy"],
            ["account", "Account"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-1 font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-black data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none -mb-px"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <section className={panelClass}>
            <PanelHeader title="Notification Preferences" description="Choose what we contact you about." />
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Email
            </h3>
            <div className="mb-8">
              <ToggleRow name="Event announcements" description="New events and registration updates" defaultChecked />
              <ToggleRow name="Committee updates" description="Updates from your committees and working groups" defaultChecked />
              <ToggleRow name="Publication releases" description="New publications and research" />
              <ToggleRow name="Weekly newsletter" description="Our weekly digest of law, technology, and policy" />
            </div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
              In-app
            </h3>
            <div>
              <ToggleRow name="Direct messages" description="When someone sends you a message" defaultChecked />
              <ToggleRow name="Meeting reminders" description="Upcoming committee meetings" defaultChecked />
              <ToggleRow name="Event reminders" description="Events you have registered for" defaultChecked />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="privacy" className="mt-0 space-y-6">
          <section className={panelClass}>
            <PanelHeader title="Profile Visibility" description="Control what other members can see." />
            <ToggleRow name="Show profile in member directory" description="Allow other members to find and connect with you" defaultChecked />
            <ToggleRow name="Show activity status" description="Let others see when you're online" />
            <ToggleRow name="Show committee memberships" description="Display your committee affiliations on your profile" />
          </section>

          <section className={panelClass}>
            <PanelHeader title="Change Password" />
            <div className="space-y-6 max-w-xl">
              <div>
                <label htmlFor="currentPassword" className={labelClass}>
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    className={`${inputClass} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-neutral-500 hover:text-black cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="newPassword" className={labelClass}>
                    New Password
                  </label>
                  <Input id="newPassword" type="password" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className={labelClass}>
                    Confirm New Password
                  </label>
                  <Input id="confirmPassword" type="password" className={inputClass} />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center border border-black text-black hover:bg-black hover:!text-white font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="account" className="mt-0 space-y-6">
          {SHOW_DATA_EXPORT && (
            <section className={panelClass}>
              <PanelHeader
                title="Export Your Data"
                description="Download a copy of your profile information, messages, and activity history."
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-black text-black hover:bg-black hover:!text-white font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Request Data Export
              </button>
            </section>
          )}

          <section className="bg-white border border-black p-6 lg:p-8">
            <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Danger Zone
            </span>
            <h2 className="text-2xl font-serif font-normal text-black mb-2">Delete Account</h2>
            <p className="text-sm text-neutral-600 mb-6 max-w-2xl">
              Permanently delete your account and all associated data. This action
              cannot be undone.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-black !text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
