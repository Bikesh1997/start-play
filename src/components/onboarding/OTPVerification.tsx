import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OTPVerificationProps {
  onVerify: () => void;
  onBack: () => void;
  totalPoints: number;
  currentStep: number;
  steps: any[];
}

const OTPVerification = ({ onVerify, onBack, totalPoints, currentStep, steps }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(30);
    setCanResend(false);
    toast.success("OTP sent successfully!");
  };

  const handleCallMe = () => {
    toast.success("You will receive a call shortly with your OTP");
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      setShowSuccessDialog(true);
      setTimeout(() => {
        setShowSuccessDialog(false);
        onVerify();
      }, 2000);
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <img src="/au-bank-logo.svg" alt="AU Small Finance Bank" className="h-8" />
          <GamificationDisplay totalPoints={totalPoints} />
        </div>
        <button onClick={onBack} className="text-white/80 hover:text-white text-sm">
          ← Back
        </button>
      </div>

      <ProgressIndicator steps={steps} currentStep={currentStep} />

      {/* Content */}
      <div className="flex-1 p-6 space-y-8 animate-slide-up">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Verify Your Number</h1>
          <p className="text-muted-foreground">
            We've sent a 6-digit code to +91 98765 43210
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
              <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
              <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
              <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
              <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
              <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {canResend ? "OTP expired" : `Resend in ${countdown}s`}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
          >
            Verify OTP
          </Button>

          <Button
            onClick={handleResend}
            disabled={!canResend}
            variant="outline"
            className="w-full text-lg py-6 rounded-xl"
          >
            Resend OTP
          </Button>

          <Button
            onClick={handleCallMe}
            variant="outline"
            className="w-full text-lg py-6 rounded-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Me Instead
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-center text-muted-foreground">
          Didn't receive the code? Check your network connection or try voice call option
        </p>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              ✓ Number Verified!
            </DialogTitle>
            <DialogDescription className="text-center text-lg pt-4">
              Your onboarding starts now
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OTPVerification;
