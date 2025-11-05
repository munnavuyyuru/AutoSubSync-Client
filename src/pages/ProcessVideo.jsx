import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Play, Download, Eye } from "lucide-react";
import { toast } from "sonner";
import VideoUpload from "@/components/VideoUpload";
import ProcessingSteps from "@/components/ProcessingSteps";
import SubtitlePreview from "@/components/SubtitlePreview";

export default function ProcessVideo() {
  const navigate = useNavigate();

  const [step, setStep] = useState("input");
  const [videoFile, setVideoFile] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [progress, setProgress] = useState(0);
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/auth");
  }, [navigate]);

  // Helper to add numeric IDs to segments
  const addIdsToSegments = (segments) => {
    return segments.map((seg, index) => ({
      ...seg,
      id: index + 1,
    }));
  };

  const languages = [
    { code: "auto", name: "Auto-detect" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "te", name: "Telugu" },
    { code: "ta", name: "Tamil" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "hi", name: "Hindi" },
    { code: "ar", name: "Arabic" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
  ];

  const handleProcess = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/auth");
      return;
    }

    if (!videoFile) {
      toast.error("Please upload a video file");
      return;
    }

    try {
      setStep("processing");
      setProgress(10);

      //Upload video
      const formData = new FormData();
      formData.append("video", videoFile);

      const uploadRes = await fetch("http://localhost:5000/api/job/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Upload failed: ${uploadRes.status} ${errText}`);
      }

      const { audioFile } = await uploadRes.json();
      if (!audioFile) throw new Error("No audio file returned from upload");
      setProgress(30);

      //Transcribe
      const transcribeRes = await fetch(
        "http://localhost:5000/api/job/transcribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            audioFile,
            language: sourceLanguage,
            chunkSeconds: 0,
          }),
        }
      );

      if (!transcribeRes.ok) {
        const errText = await transcribeRes.text();
        throw new Error(
          `Transcription failed: ${transcribeRes.status} ${errText}`
        );
      }

      const { segments } = await transcribeRes.json();
      setProgress(60);

      //Translate
      const translateRes = await fetch(
        "http://localhost:5000/api/job/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            segments,
            source_language: sourceLanguage,
            target_language: targetLanguage,
          }),
        }
      );

      if (!translateRes.ok) {
        const errText = await translateRes.text();
        throw new Error(
          `Translation failed: ${translateRes.status} ${errText}`
        );
      }

      const { segments: translatedSegments } = await translateRes.json();
      setProgress(100);

      // Add ids for segments to edit them in SubtitlePreview
      setSubtitles(addIdsToSegments(translatedSegments));

      setStep("preview");
      toast.success("Subtitles generated successfully!");
    } catch (error) {
      console.error("Pipeline error:", error);
      toast.error(error.message || "An error occurred during processing");
      setStep("input");
    }
  };

  const getLanguageName = (code) => {
    const lang = languages.find((lang) => lang.code === code);
    return lang ? lang.name : code;
  };

  const downloadSubtitles = (format) => {
    const getBaseFileName = (filename) => {
      return filename.replace(/\.[^/.]+$/, "");
    };
    const baseName = getBaseFileName(videoFile.name);

    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(
      now.getHours()
    ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    const langName = getLanguageName(targetLanguage);
    const fileName = `${baseName}_${timestamp}_subtitles_${langName}.${format}`;

    let content = "";

    if (format === "srt") {
      content = subtitles
        .map((sub, index) => {
          const startTime = formatTime(sub.start);
          const endTime = formatTime(sub.end);
          return `${index + 1}\n${startTime} --> ${endTime}\n${sub.text}\n`;
        })
        .join("\n");
    } else {
      content =
        "WEBVTT\n\n" +
        subtitles
          .map((sub) => {
            const startTime = formatTimeVTT(sub.start);
            const endTime = formatTimeVTT(sub.end);
            return `${startTime} --> ${endTime}\n${sub.text}\n`;
          })
          .join("\n");
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Subtitles downloaded as ${format.toUpperCase()}`);
  };

  const formatTime = (seconds) => {
    const ms = seconds * 1000;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const millis = Math.floor(ms % 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")},${millis
      .toString()
      .padStart(3, "0")}`;
  };

  const formatTimeVTT = (seconds) => {
    const ms = seconds * 1000;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const millis = Math.floor(ms % 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${millis
      .toString()
      .padStart(3, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Upload Video</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === "input" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Video File
              </CardTitle>
              <CardDescription>
                Select a video file from your device to generate subtitles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <VideoUpload
                onFileSelect={setVideoFile}
                selectedFile={videoFile}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Source Language</Label>
                  <Select
                    value={sourceLanguage}
                    onValueChange={setSourceLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Language</Label>
                  <Select
                    value={targetLanguage}
                    onValueChange={setTargetLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages
                        .filter((lang) => lang.code !== "auto")
                        .map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleProcess}
                className="w-full"
                size="lg"
                disabled={!videoFile}
              >
                <Play className="w-4 h-4 mr-2" />
                Generate Subtitles
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "processing" && <ProcessingSteps progress={progress} />}

        {step === "preview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Subtitle Preview
                  </span>
                  <Badge variant="default">Ready for Download</Badge>
                </CardTitle>
                <CardDescription>
                  Review and edit your generated subtitles before downloading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubtitlePreview
                  subtitles={subtitles}
                  onSubtitlesChange={setSubtitles}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Download Subtitles</CardTitle>
                <CardDescription>
                  Choose your preferred subtitle format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    onClick={() => downloadSubtitles("srt")}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download SRT
                  </Button>
                  <Button
                    onClick={() => downloadSubtitles("vtt")}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download WebVTT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
