import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out origin-left"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Step Indicators */}
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                step.completed
                  ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                  : step.id === currentStep
                  ? "bg-primary/20 text-primary ring-4 ring-primary/30 scale-110"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.completed ? (
                <Check className="w-5 h-5 animate-bounce-in" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium text-center max-w-[60px] transition-colors",
                step.id === currentStep
                  ? "text-primary"
                  : step.completed
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
