import { Badge } from "@/components/ui/badge";
import { FileVideo, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const RecentProjects = ({ projects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>
          Your latest subtitle generation projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileVideo className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.language}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant={
                    project.status === "completed" ? "default" : "secondary"
                  }
                >
                  {project.status === "completed" ? "Completed" : "Processing"}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {project.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProjects;
