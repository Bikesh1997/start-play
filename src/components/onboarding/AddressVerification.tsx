import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";

interface AddressVerificationProps {
  onNext: () => void;
  onBack: () => void;
  totalPoints: number;
  recentPoints?: number;
  currentStep: number;
  steps: any[];
}

const AddressVerification = ({ onNext, onBack, totalPoints, recentPoints, currentStep, steps }: AddressVerificationProps) => {
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [verified, setVerified] = useState(false);

  const handlePincodeChange = (value: string) => {
    setPincode(value);
    // Simulate auto-suggest
    if (value.length === 6) {
      setCity("Mumbai");
      setState("Maharashtra");
      toast.success("Location found!");
    }
  };

  const handleVerify = () => {
    if (pincode.length === 6 && address && city && state) {
      setVerified(true);
      toast.success("Address verified! +15 Points earned");
      setTimeout(onNext, 1000);
    } else {
      toast.error("Please fill all address fields");
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
          <h1 className="text-3xl font-bold text-foreground">Address Verification</h1>
          <p className="text-muted-foreground">Where do you live?</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {/* PIN Code */}
          <div className="space-y-2">
            <Label htmlFor="pincode">PIN Code</Label>
            <div className="relative">
              <Input
                id="pincode"
                placeholder="Enter 6-digit PIN code"
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                maxLength={6}
                className="pr-10"
              />
              {pincode.length === 6 && (
                <MapPin className="absolute right-3 top-3 w-5 h-5 text-accent animate-bounce-in" />
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="House no., Building, Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="relative">
              <Input
                id="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pr-10"
              />
              {city && (
                <Check className="absolute right-3 top-3 w-5 h-5 text-accent" />
              )}
            </div>
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <div className="relative">
              <Input
                id="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="pr-10"
              />
              {state && (
                <Check className="absolute right-3 top-3 w-5 h-5 text-accent" />
              )}
            </div>
          </div>

          <Button
            onClick={handleVerify}
            disabled={!pincode || !address || !city || !state}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
          >
            Verify Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressVerification;
