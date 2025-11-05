import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Play } from "lucide-react";
import { toast } from "sonner";

export default function SubtitlePreview({ subtitles, onSubtitlesChange }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  // ✅ FIXED: Accepts seconds (from backend), formats as HH:MM:SS
  const formatTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ FIXED: Parses HH:MM:SS and returns SECONDS (to match backend format)
  const parseTime = (timeStr) => {
    const trimmed = timeStr.trim();
    const parts = trimmed.split(":").map(part => part.padStart(2, "0"));
    if (parts.length !== 3) return 0;

    const [hours, minutes, seconds] = parts.map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return 0;

    return hours * 3600 + minutes * 60 + seconds; // 👈 returns SECONDS
  };

  const startEdit = (subtitle) => {
    setEditingId(subtitle.id);
    setEditText(subtitle.text);
    setEditStart(formatTime(subtitle.start)); // seconds → HH:MM:SS
    setEditEnd(formatTime(subtitle.end));
  };

  const saveEdit = () => {
    if (!editingId) return;

    const startSec = parseTime(editStart); // HH:MM:SS → seconds
    const endSec = parseTime(editEnd);

    if (startSec >= endSec) {
      toast.error("Start time must be before end time");
      return;
    }

    const updatedSubtitles = subtitles.map((sub) =>
      sub.id === editingId
        ? { ...sub, text: editText, start: startSec, end: endSec } // store in seconds
        : sub
    );

    onSubtitlesChange(updatedSubtitles);
    setEditingId(null);
    toast.success("Subtitle updated successfully");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditStart("");
    setEditEnd("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Generated Subtitles</h3>
          <p className="text-sm text-gray-600">
            {subtitles.length} subtitle segments • Click to edit timing and text
          </p>
        </div>
        <Badge variant="secondary">
          {formatTime(subtitles[subtitles.length - 1]?.end || 0)} total
        </Badge>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-3">
        {subtitles.map((subtitle) => (
          <Card key={subtitle.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              {editingId === subtitle.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        Start Time
                      </label>
                      <Input
                        value={editStart}
                        onChange={(e) => setEditStart(e.target.value)}
                        placeholder="00:00:00"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        End Time
                      </label>
                      <Input
                        value={editEnd}
                        onChange={(e) => setEditEnd(e.target.value)}
                        placeholder="00:00:00"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">
                      Subtitle Text
                    </label>
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveEdit}>
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        #{subtitle.id}
                      </Badge>
                      <span className="text-sm font-mono text-gray-600">
                        {formatTime(subtitle.start)} →{" "}
                        {formatTime(subtitle.end)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(subtitle)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{subtitle.text}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <div className="flex items-center text-sm text-gray-600">
          <Play className="w-4 h-4 mr-2" />
          <span>
            Tip: Click the edit button to modify subtitle text and timing. Use
            format HH:MM:SS for time values.
          </span>
        </div>
      </div>
    </div>
  );
}