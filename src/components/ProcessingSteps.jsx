import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Loader2 } from "lucide-react";

export default function ProcessingSteps({ progress }) {
  //steps matching your backend flow
  const steps = [
    {
      name: "Uploading Video",
      description: "Uploading your video file to the server",
      threshold: 30,
    },
    {
      name: "Transcribing Speech",
      description: "Converting audio to text using AI",
      threshold: 60,
    },
    {
      name: "Translating Subtitles",
      description: "Translating text to your target language",
      threshold: 100,
    },
  ];

  const getStepStatus = (threshold) => {
    if (progress >= threshold) return "completed";
    // Active if progress is beyond previous step
    const prevThreshold =
      steps.find((s) => s.threshold < threshold)?.threshold || 0;
    if (progress > prevThreshold) return "active";
    return "pending";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.threshold);
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : status === "active" ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium ${
                        status === "completed"
                          ? "text-green-700"
                          : status === "active"
                          ? "text-blue-700"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </h3>
                    <Badge
                      variant={
                        status === "completed"
                          ? "default"
                          : status === "active"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {status === "completed"
                        ? "Done"
                        : status === "active"
                        ? "Processing"
                        : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin mr-2" />
            <span className="text-sm text-blue-700">
              Processing typically takes 5-10 minutes depending on video length
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
