import { Badge } from "@/components/ui/badge";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Telugu",
  "Tamil",
  "Kannada",
  "Malayalam",
  "Hindi",
  "Arabic",
  "Chinese",
  "Japanese",
];

const LanguagesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supported Languages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate subtitles in multiple languages with special focus on
            Indian regional languages
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {languages.map((language, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-sm py-2 px-4"
            >
              {language}
            </Badge>
          ))}
          <Badge variant="outline" className="text-sm py-2 px-4">
            + More Coming Soon
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
