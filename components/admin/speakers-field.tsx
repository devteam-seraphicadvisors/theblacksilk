"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Speaker {
  name: string;
  title: string;
  bio?: string;
  image?: string;
  url?: string;
}

interface SpeakersFieldProps {
  speakers: Speaker[];
  onChange: (speakers: Speaker[]) => void;
}

export function SpeakersField({ speakers, onChange }: SpeakersFieldProps) {
  const addSpeaker = () => {
    onChange([
      ...speakers,
      { name: "", title: "", bio: "", image: "", url: "" },
    ]);
  };

  const removeSpeaker = (index: number) => {
    onChange(speakers.filter((_, i) => i !== index));
  };

  const updateSpeaker = (
    index: number,
    field: keyof Speaker,
    value: string
  ) => {
    const updated = speakers.map((speaker, i) =>
      i === index ? { ...speaker, [field]: value } : speaker
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Speakers</Label>
        <Button type="button" variant="outline" size="sm" onClick={addSpeaker}>
          <Plus className="h-4 w-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      {speakers.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
          <User className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>No speakers added yet. Click "Add Speaker" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {speakers.map((speaker, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-sm text-gray-700">
                    Speaker {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpeaker(index)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`speaker-name-${index}`}
                      className="text-xs"
                    >
                      Name *
                    </Label>
                    <Input
                      id={`speaker-name-${index}`}
                      value={speaker.name}
                      onChange={(e) =>
                        updateSpeaker(index, "name", e.target.value)
                      }
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`speaker-title-${index}`}
                      className="text-xs"
                    >
                      Title/Role *
                    </Label>
                    <Input
                      id={`speaker-title-${index}`}
                      value={speaker.title}
                      onChange={(e) =>
                        updateSpeaker(index, "title", e.target.value)
                      }
                      placeholder="CEO, Company Name"
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor={`speaker-bio-${index}`} className="text-xs">
                      Bio
                    </Label>
                    <Textarea
                      id={`speaker-bio-${index}`}
                      value={speaker.bio}
                      onChange={(e) =>
                        updateSpeaker(index, "bio", e.target.value)
                      }
                      placeholder="Brief biography..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`speaker-image-${index}`}
                      className="text-xs"
                    >
                      Image URL
                    </Label>
                    <Input
                      id={`speaker-image-${index}`}
                      value={speaker.image}
                      onChange={(e) =>
                        updateSpeaker(index, "image", e.target.value)
                      }
                      placeholder="https://example.com/photo.jpg"
                      type="url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`speaker-url-${index}`} className="text-xs">
                      Website/LinkedIn URL
                    </Label>
                    <Input
                      id={`speaker-url-${index}`}
                      value={speaker.url}
                      onChange={(e) =>
                        updateSpeaker(index, "url", e.target.value)
                      }
                      placeholder="https://linkedin.com/in/..."
                      type="url"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
