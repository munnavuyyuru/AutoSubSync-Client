import { Play, Upload, Globe, Download } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Upload Video",
    description: "Upload your video file or paste a YouTube URL",
  },
  {
    icon: <Play className="w-8 h-8" />,
    title: "AI Processing",
    description:
      "Our AI extracts audio, detects language, and generates transcripts",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Translation",
    description: "Automatic translation to your preferred language",
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Download",
    description: "Get your perfectly timed subtitles in multiple formats",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate professional subtitles in just 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 text-blue-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
