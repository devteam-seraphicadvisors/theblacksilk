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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-mono mb-8">
              <FileText className="h-3.5 w-3.5 mr-2 text-white" />
              <span>Research & Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 text-white tracking-tight">
              Fact Sheets
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              Concise, authoritative briefings on key legal tech, data governance, and regulatory developments
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="p-12 border border-neutral-200 bg-neutral-50">
            <FileText className="h-12 w-12 text-black mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-black mb-2">Fact Sheets Archive</h2>
            <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6">
              Our fact sheets and policy briefs are currently being updated with the latest 2025-2026 regulatory frameworks. Check back soon for new publications.
            </p>
            <Button className="bg-black hover:bg-neutral-800 !text-white rounded-none text-xs font-mono uppercase tracking-wider" asChild>
              <Link href="/knowledge-hub/blog">View Latest Insights</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
