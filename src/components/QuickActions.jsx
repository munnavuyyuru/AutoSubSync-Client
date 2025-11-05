import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4 mb-8">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate("/process?type=upload")}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-semibold">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              Upload Video File
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">
              Upload your video file and generate subtitles in multiple
              languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Supports MP4, AVI, MOV, and more. Max file size: 5GB
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActions;
