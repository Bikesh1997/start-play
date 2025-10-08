import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Wallet, TrendingUp, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";

interface AccountTypeSelectionProps {
  onNext: () => void;
  onBack: () => void;
  totalPoints: number;
  recentPoints?: number;
  currentStep: number;
  steps: any[];
}

const accountTypes = [
  {
    id: "savings",
    name: "Savings Account",
    icon: Wallet,
    benefits: [
      "Zero balance requirement",
      "4% interest rate",
      "Free debit card",
      "Online banking",
    ],
  },
  {
    id: "salary",
    name: "Salary Account",
    icon: TrendingUp,
    benefits: [
      "No minimum balance",
      "Free insurance coverage",
      "Higher transaction limits",
      "Exclusive offers",
    ],
  },
];

const AccountTypeSelection = ({ onNext, onBack, totalPoints, recentPoints, currentStep, steps }: AccountTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState("");

  const handleContinue = () => {
    if (selectedType) {
      toast.success("Account type selected! +20 Points earned");
      setTimeout(onNext, 800);
    } else {
      toast.error("Please select an account type");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <div className="flex-1 p-6 space-y-6 animate-slide-up">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Choose Account Type</h1>
          <p className="text-muted-foreground">Pick the one that suits you best</p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {accountTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "w-full p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg scale-105"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    isSelected ? "bg-primary text-white" : "bg-muted text-foreground"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{type.name}</h3>
                  </div>
                </div>

                <div className="space-y-2 pl-16">
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="max-w-md mx-auto">
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
