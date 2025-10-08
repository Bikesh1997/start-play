import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";

interface PersonalDetailsProps {
  onNext: () => void;
  onBack: () => void;
  totalPoints: number;
  recentPoints?: number;
  currentStep: number;
  steps: any[];
}

const PersonalDetails = ({ onNext, onBack, totalPoints, recentPoints, currentStep, steps }: PersonalDetailsProps) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [dobValid, setDobValid] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setNameValid(value.trim().length >= 3);
  };

  const handleSubmit = () => {
    if (nameValid && dobValid && gender) {
      toast.success("Details validated! +15 Points earned");
      setTimeout(onNext, 800);
    } else {
      toast.error("Please fill all fields correctly");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <button onClick={onBack} className="mb-4">
          ← Back
        </button>
        <GamificationDisplay totalPoints={totalPoints} recentPoints={recentPoints} />
      </div>

      <ProgressIndicator steps={steps} currentStep={currentStep} />

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 animate-slide-up">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Personal Details</h1>
          <p className="text-muted-foreground">Tell us about yourself</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="pr-10"
              />
              {nameValid && (
                <Check className="absolute right-3 top-3 w-5 h-5 text-accent animate-bounce-in" />
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : "Select date of birth"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={(date) => {
                    setDob(date);
                    setDobValid(!!date);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {dobValid && (
              <div className="flex items-center gap-2 text-accent text-sm animate-bounce-in">
                <Check className="w-4 h-4" />
                <span>Valid date selected</span>
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="flex-1 cursor-pointer">Male</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="flex-1 cursor-pointer">Female</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="flex-1 cursor-pointer">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!nameValid || !dobValid || !gender}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
