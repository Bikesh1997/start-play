import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="space-y-8 max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AU
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Welcome to AU Bank
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Banking made simple, secure, and rewarding. Open your account in minutes!
          </p>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-white/90 text-left">Quick KYC verification</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-white/90 text-left">Earn rewards & badges</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-white/90 text-left">Zero balance account</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full bg-white text-primary hover:bg-white/90 font-bold text-lg py-6 rounded-xl shadow-xl hover:scale-105 transition-transform"
        >
          Open a New Account
        </Button>

        <p className="text-sm text-white/70">
          Already have an account?{" "}
          <button className="underline font-semibold hover:text-white">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
