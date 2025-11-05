import { CheckCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">AutoSubSync</h3>
          <p className="text-gray-400 mb-6">
            AI-Powered Multilingual Subtitle Generation
          </p>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-400">
            <CheckCircle className="w-4 h-4" />
            <span>Built with ❤️ for accessibility and inclusion</span>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <span>
              &copy; {new Date().getFullYear()} AutoSubSync. All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
