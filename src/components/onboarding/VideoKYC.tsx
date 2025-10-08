import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, Check } from "lucide-react";
import { toast } from "sonner";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";
import BadgeUnlock from "../BadgeUnlock";

interface VideoKYCProps {
  onNext: () => void;
  onBack: () => void;
  totalPoints: number;
  recentPoints?: number;
  currentStep: number;
  steps: any[];
}

const VideoKYC = ({ onNext, onBack, totalPoints, recentPoints, currentStep, steps }: VideoKYCProps) => {
  const [kycStarted, setKycStarted] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const handleStartKYC = () => {
    setKycStarted(true);
    toast.info("Starting Video KYC...");
    
    // Simulate KYC process
    setTimeout(() => {
      setKycCompleted(true);
      setShowBadge(true);
      toast.success("Video KYC completed! +100 Points earned");
    }, 3000);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Badge Unlock */}
      {showBadge && (
        <BadgeUnlock
          badgeName="Verified User"
          description="You've successfully completed video KYC verification"
          onComplete={() => setShowBadge(false)}
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <button onClick={onBack} className="mb-4">
          ← Back
        </button>
        <GamificationDisplay totalPoints={totalPoints} recentPoints={recentPoints} />
      </div>

      <ProgressIndicator steps={steps} currentStep={currentStep} />

      {/* Content */}
      <div className="flex-1 p-6 space-y-8 animate-slide-up">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Video KYC</h1>
          <p className="text-muted-foreground">
            Complete your verification via video call
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Video Placeholder */}
          <div className="aspect-video bg-secondary/10 rounded-2xl border-2 border-border flex flex-col items-center justify-center overflow-hidden relative">
            {kycStarted ? (
              <>
                {kycCompleted ? (
                  <div className="text-center space-y-4 animate-bounce-in">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      KYC Successful!
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Video className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">Connecting...</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Video className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Ready to start video verification
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          {!kycStarted && (
            <div className="bg-card p-6 rounded-2xl border space-y-4">
              <h3 className="font-semibold text-foreground mb-3">
                Before you start:
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Keep your original documents ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Ensure good lighting in your room</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Follow the agent's instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>The process takes about 3-5 minutes</span>
                </li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          {!kycStarted ? (
            <Button
              onClick={handleStartKYC}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
            >
              <Video className="w-5 h-5 mr-2" />
              Start Video KYC
            </Button>
          ) : kycCompleted ? (
            <Button
              onClick={handleContinue}
              className="w-full bg-accent hover:bg-accent/90 text-lg py-6 rounded-xl"
            >
              Continue to Status
            </Button>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Please wait while we connect you to an agent...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoKYC;
