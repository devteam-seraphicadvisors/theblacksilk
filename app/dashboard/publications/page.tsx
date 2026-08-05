"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Download,
  Eye,
  Calendar,
  User,
  Filter,
  Bookmark,
  Share,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Publication {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  category: string;
  type: string;
  readTime: string;
  description: string;
  image?: string;
  downloadCount: number;
  saved: boolean;
  tags: string[];
  pdfUrl?: string;
  savedAt?: string;
}

export default function PublicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("saved");
  const [savedPublications, setSavedPublications] = useState<Publication[]>([]);
  const [recentPublications, setRecentPublications] = useState<Publication[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchPublications();
    }
  }, [session]);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const [savedRes, recentRes] = await Promise.all([
        fetch("/api/user/saved-publications"),
        fetch("/api/publications?limit=10"),
      ]);

      if (savedRes.ok) {
        const savedData = await savedRes.json();
        setSavedPublications(savedData.publications || []);
      }

      if (recentRes.ok) {
        const recentData = await recentRes.json();
        setRecentPublications(
          recentData.publications?.map((pub: any) => ({
            ...pub,
            saved: false,
          })) || []
        );
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePublication = async (publicationId: string) => {
    try {
      const response = await fetch("/api/user/saved-publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicationId }),
      });

      if (response.ok) {
        fetchPublications();
      }
    } catch (error) {
      console.error("Error saving publication:", error);
    }
  };

  const handleUnsavePublication = async (publicationId: string) => {
    try {
      const response = await fetch(
        `/api/user/saved-publications?publicationId=${publicationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchPublications();
      }
    } catch (error) {
      console.error("Error removing saved publication:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const filteredSaved = savedPublications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredRecent = recentPublications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const PublicationCard = ({
    publication,
    showSaveButton = false,
  }: {
    publication: Publication;
    showSaveButton?: boolean;
  }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row">
        {publication.image && (
          <div className="relative h-48 lg:h-auto lg:w-48 flex-shrink-0">
            <Image
              src={publication.image}
              alt={publication.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-900">
                {publication.type}
              </Badge>
            </div>
          </div>
        )}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {publication.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(publication.publishDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {publication.readTime}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {publication.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {publication.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t">
              <div className="flex items-center text-sm text-gray-500">
                <Download className="h-4 w-4 mr-1" />
                {publication.downloadCount} downloads
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  asChild
                >
                  <Link href={`/knowledge-hub/blog/${publication.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Link>
                </Button>
                {publication.pdfUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    asChild
                  >
                    <a href={publication.pdfUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                )}
                {showSaveButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSavePublication(publication.id)}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                )}
                {!showSaveButton && publication.saved && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnsavePublication(publication.id)}
                  >
                    <Bookmark className="mr-2 h-4 w-4 fill-current" />
                    Saved
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Publications
          </h1>
          <p className="text-gray-600 mt-1">
            Access your saved publications and discover new research
          </p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse All Publications
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search publications, authors, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Publications Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved">Saved Publications</TabsTrigger>
          <TabsTrigger value="recent">Recent Publications</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-6">
          {filteredSaved.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Saved Publications
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't saved any publications yet. Browse recent
                  publications to save ones that interest you!
                </p>
                <Button onClick={() => setActiveTab("recent")}>
                  Browse Recent Publications
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredSaved.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {filteredRecent.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Publications Found
                </h3>
                <p className="text-gray-600 mb-6">
                  No recent publications match your search criteria.
                </p>
                <Button asChild>
                  <Link href="/knowledge-hub/blog">
                    Browse All Publications
                  </Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredRecent.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  showSaveButton
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
