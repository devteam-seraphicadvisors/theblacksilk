"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  time: string;
  title: string;
  description?: string;
}

interface TimelineFieldProps {
  timeline: TimelineItem[];
  onChange: (timeline: TimelineItem[]) => void;
}

export function TimelineField({ timeline, onChange }: TimelineFieldProps) {
  const addTimelineItem = () => {
    onChange([...timeline, { time: "", title: "", description: "" }]);
  };

  const removeTimelineItem = (index: number) => {
    onChange(timeline.filter((_, i) => i !== index));
  };

  const updateTimelineItem = (
    index: number,
    field: keyof TimelineItem,
    value: string
  ) => {
    const updated = timeline.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Timeline</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTimelineItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Timeline Item
        </Button>
      </div>

      {timeline.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
          <Clock className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>
            No timeline items yet. Click "Add Timeline Item" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-sm text-gray-700">
                    Item {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTimelineItem(index)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`timeline-time-${index}`}
                      className="text-xs"
                    >
                      Time *
                    </Label>
                    <Input
                      id={`timeline-time-${index}`}
                      value={item.time}
                      onChange={(e) =>
                        updateTimelineItem(index, "time", e.target.value)
                      }
                      placeholder="10:00 AM"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={`timeline-title-${index}`}
                      className="text-xs"
                    >
                      Title *
                    </Label>
                    <Input
                      id={`timeline-title-${index}`}
                      value={item.title}
                      onChange={(e) =>
                        updateTimelineItem(index, "title", e.target.value)
                      }
                      placeholder="Session Title"
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label
                      htmlFor={`timeline-description-${index}`}
                      className="text-xs"
                    >
                      Description
                    </Label>
                    <Textarea
                      id={`timeline-description-${index}`}
                      value={item.description}
                      onChange={(e) =>
                        updateTimelineItem(index, "description", e.target.value)
                      }
                      placeholder="Brief description of this session..."
                      rows={2}
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
