import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of content creators who trust AutoSubSync for their
          subtitle needs
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => navigate("/auth")}
          className="text-lg px-8 py-6"
        >
          <Star className="w-5 h-5 mr-2" />
          Start Free Today
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
