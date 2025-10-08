import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";
import Confetti from "../Confetti";

interface ConsentDeclarationProps {
  onNext: () => void;
  onBack: () => void;
  totalPoints: number;
  recentPoints?: number;
  currentStep: number;
  steps: any[];
}

const ConsentDeclaration = ({ onNext, onBack, totalPoints, recentPoints, currentStep, steps }: ConsentDeclarationProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = () => {
    if (termsAccepted && dataConsent) {
      setShowConfetti(true);
      toast.success("Onboarding complete! +30 Points + New Member Badge earned");
      setTimeout(onNext, 2000);
    } else {
      toast.error("Please accept all terms and conditions");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <img src="/au-bank-logo.svg" alt="AU Small Finance Bank" className="h-8" />
          <GamificationDisplay totalPoints={totalPoints} recentPoints={recentPoints} />
        </div>
        <button onClick={onBack} className="text-white/80 hover:text-white text-sm">
          ← Back
        </button>
      </div>

      <ProgressIndicator steps={steps} currentStep={currentStep} />

      {/* Content */}
      <div className="flex-1 p-6 space-y-8 animate-slide-up">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Terms & Consent</h1>
          <p className="text-muted-foreground">
            Almost there! Just a few formalities
          </p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {/* Terms & Conditions */}
          <div className="p-6 bg-card rounded-2xl border-2 border-border space-y-4">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  By creating an account, you agree to our terms of service, privacy policy, and account usage guidelines.
                </p>
                <button className="text-primary text-sm font-medium hover:underline">
                  Read full terms →
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-4 border-t">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I have read and agree to the Terms & Conditions
              </Label>
            </div>
          </div>

          {/* Data Consent */}
          <div className="p-6 bg-card rounded-2xl border-2 border-border space-y-4">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Data Consent</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We need your consent to process and store your personal information securely for KYC and banking operations.
                </p>
                <button className="text-primary text-sm font-medium hover:underline">
                  Read privacy policy →
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-4 border-t">
              <Checkbox
                id="consent"
                checked={dataConsent}
                onCheckedChange={(checked) => setDataConsent(checked as boolean)}
              />
              <Label
                htmlFor="consent"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I consent to the collection and processing of my data
              </Label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!termsAccepted || !dataConsent}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
          >
            Submit & Continue
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsentDeclaration;
