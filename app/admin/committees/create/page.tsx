"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function CreateCommitteePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    chairName: "",
    coChairName: "",
    focusAreas: "",
    status: "active" as "active" | "inactive",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        focusAreas: formData.focusAreas
          .split(",")
          .map((area) => area.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/admin/committees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Committee created successfully",
        });
        router.push("/admin/committees");
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create committee",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating committee:", error);
      toast({
        title: "Error",
        description: "Failed to create committee",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/committees">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Committees
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Committee
            </h1>
            <p className="text-gray-600">Add a new committee to the platform</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Committee Information</CardTitle>
            <CardDescription>
              Enter the details of the new committee
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Committee Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Enter committee name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                required
                placeholder="Describe the committee's purpose and goals"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chairName">Chair</Label>
                <Input
                  id="chairName"
                  value={formData.chairName}
                  onChange={(e) =>
                    setFormData({ ...formData, chairName: e.target.value })
                  }
                  placeholder="Chair name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coChairName">Co-Chair</Label>
                <Input
                  id="coChairName"
                  value={formData.coChairName}
                  onChange={(e) =>
                    setFormData({ ...formData, coChairName: e.target.value })
                  }
                  placeholder="Co-chair name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="focusAreas">Focus Areas</Label>
              <Input
                id="focusAreas"
                value={formData.focusAreas}
                onChange={(e) =>
                  setFormData({ ...formData, focusAreas: e.target.value })
                }
                placeholder="Comma-separated focus areas"
              />
              <p className="text-sm text-muted-foreground">
                Enter multiple focus areas separated by commas
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Link href="/admin/committees">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Committee
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
