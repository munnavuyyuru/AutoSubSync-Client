import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Zap, Shield, Download } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multilingual Support",
    description:
      "Support for 15+ languages including Telugu, Tamil, Kannada, Malayalam, and more",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI-Powered Processing",
    description:
      "Advanced speech recognition and translation powered by cutting-edge AI",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    description:
      "Your videos are processed securely with enterprise-grade privacy protection",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Multiple Formats",
    description: "Download subtitles in SRT, WebVTT, and other popular formats",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AutoSubSync?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make subtitle generation effortless
            and accurate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
