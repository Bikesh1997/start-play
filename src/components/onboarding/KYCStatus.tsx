import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, TrendingUp } from "lucide-react";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";
import Confetti from "../Confetti";

interface KYCStatusProps {
  onComplete: () => void;
  totalPoints: number;
  currentStep: number;
  steps: any[];
}

const KYCStatus = ({ onComplete, totalPoints, currentStep, steps }: KYCStatusProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Confetti />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <GamificationDisplay totalPoints={totalPoints} recentPoints={200} />
      </div>

      <ProgressIndicator steps={steps} currentStep={currentStep} />

      {/* Content */}
      <div className="flex-1 p-6 space-y-8 animate-slide-up">
        <div className="text-center space-y-4 max-w-md mx-auto">
          {/* Success Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-xl">
              <CheckCircle2 className="w-16 h-16 text-white animate-bounce-in" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground">
            Congratulations!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your KYC has been approved
          </p>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 p-6 rounded-2xl border-2 border-gold/30 space-y-4 mt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-gold animate-sparkle" />
              <h3 className="text-xl font-bold text-foreground">
                You've Earned
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-gold mb-1">
                  {totalPoints}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Points
                </div>
              </div>
              <div className="bg-card p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>

          {/* Profile Creation Animation */}
          <div className="bg-card p-8 rounded-2xl border space-y-6 mt-8">
            <h3 className="font-semibold text-foreground text-lg">
              Creating Your Profile...
            </h3>
            
            {/* Circular Progress */}
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="351.86"
                  strokeDashoffset="0"
                  className="text-primary animate-progress"
                  strokeLinecap="round"
                  style={{
                    animation: "progress 2s ease-out forwards",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">100%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Profile created</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Account activated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Welcome bonus added</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onComplete}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl mt-8"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Start Banking
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            stroke-dashoffset: 351.86;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default KYCStatus;
