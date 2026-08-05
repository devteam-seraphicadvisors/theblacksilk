"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Building2, Users, Tag, Eye } from "lucide-react";

interface Committee {
  id: string;
  name: string;
  description: string;
  chairName?: string;
  coChairName?: string;
  focusAreas: string[];
  memberCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

export default function AdminCommitteesPage() {
  const router = useRouter();
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommittees();
  }, []);

  const fetchCommittees = async () => {
    try {
      const response = await fetch("/api/admin/committees");
      if (response.ok) {
        const data = await response.json();
        setCommittees(data.committees || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch committees",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this committee?")) return;

    try {
      const response = await fetch(`/api/admin/committees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Committee deleted successfully",
        });
        fetchCommittees();
      } else {
        throw new Error("Failed to delete committee");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete committee",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Committees Management
          </h1>
          <p className="text-muted-foreground">
            Manage all committees and their focus areas
          </p>
        </div>
        <Link href="/admin/committees/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Committee
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Committees</CardTitle>
          <CardDescription>
            Manage and monitor all platform committees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Committee</TableHead>
                <TableHead>Chair / Co-Chair</TableHead>
                <TableHead>Focus Areas</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {committees.map((committee) => (
                <TableRow key={committee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {committee.name}
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {committee.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {committee.chairName && (
                        <div className="font-medium">{committee.chairName}</div>
                      )}
                      {committee.coChairName && (
                        <div className="text-muted-foreground">
                          {committee.coChairName}
                        </div>
                      )}
                      {!committee.chairName && !committee.coChairName && (
                        <span className="text-muted-foreground">
                          Not assigned
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {committee.focusAreas.slice(0, 2).map((area, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {area}
                        </Badge>
                      ))}
                      {committee.focusAreas.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{committee.focusAreas.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{committee.memberCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(committee.status)}>
                      {committee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/committees/${committee.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(committee.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
