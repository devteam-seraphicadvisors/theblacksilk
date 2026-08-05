"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Download,
  Search,
  FileText,
  Calendar,
  Eye,
  Filter,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SimpleLoader } from "@/components/simple-loader";

interface FactSheet {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  publishedAt: string;
  downloads: number;
  image: string | null;
  tags: string[];
  featured: boolean;
  rating: number;
  pdfUrl: string | null;
}

function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}

export default function FactSheetsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Fact Sheets</h1>
        <p className="text-gray-600 mt-4">
          Fact sheets listing is temporarily simplified for build debugging.
        </p>
      </div>
    </main>
  );
}
