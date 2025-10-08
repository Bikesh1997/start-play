import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, Check, Coins } from "lucide-react";
import { toast } from "sonner";
import ProgressIndicator from "../ProgressIndicator";
import GamificationDisplay from "../GamificationDisplay";

interface DocumentUploadProps {
  onNext: () => void;
  onBack: () => void;
  totalPoints: number;
  recentPoints?: number;
  currentStep: number;
  steps: any[];
}

const DocumentUpload = ({ onNext, onBack, totalPoints, recentPoints, currentStep, steps }: DocumentUploadProps) => {
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [panError, setPanError] = useState("");

  // PAN format: ABCDE1234F (5 letters, 4 digits, 1 letter)
  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (pan.length === 0) {
      setPanError("");
      return false;
    }
    if (!panRegex.test(pan)) {
      setPanError("Invalid format. Use: ABCDE1234F");
      return false;
    }
    setPanError("");
    return true;
  };

  const handleAadhaarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaarFile(e.target.files[0]);
      toast.success("Aadhaar uploaded successfully!");
    }
  };

  const handlePanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPanFile(e.target.files[0]);
      toast.success("PAN uploaded successfully!");
    }
  };

  const handleContinue = () => {
    const isPANValid = validatePAN(panNumber);
    
    if (!aadhaarFile || !panFile) {
      toast.error("Please upload both documents");
      return;
    }
    
    if (aadhaarNumber.length !== 12) {
      toast.error("Aadhaar number must be 12 digits");
      return;
    }
    
    if (!isPANValid) {
      toast.error("Please enter valid PAN in format: ABCDE1234F");
      return;
    }
    
    toast.success("Documents uploaded! +50 Points earned");
    setTimeout(onNext, 1000);
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
          <h1 className="text-3xl font-bold text-foreground">KYC Documents</h1>
          <p className="text-muted-foreground">Upload your identity documents</p>
          <div className="flex items-center justify-center gap-2 text-gold mt-4">
            <Coins className="w-5 h-5 animate-sparkle" />
            <span className="font-bold">Earn +50 Points on upload</span>
          </div>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {/* Aadhaar Upload */}
          <div className="p-6 bg-card rounded-2xl border-2 border-border space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Aadhaar Card</h3>
            </div>

            <div className="space-y-3">
              <Label htmlFor="aadhaar-number">Aadhaar Number</Label>
              <Input
                id="aadhaar-number"
                placeholder="Enter 12-digit Aadhaar number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                maxLength={12}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar-file">Upload Aadhaar</Label>
              <div className="relative">
                <Input
                  id="aadhaar-file"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleAadhaarUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="aadhaar-file"
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  {aadhaarFile ? (
                    <>
                      <Check className="w-5 h-5 text-accent animate-bounce-in" />
                      <span className="text-sm">{aadhaarFile.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload
                      </span>
                    </>
                  )}
                </Label>
              </div>
            </div>
          </div>

          {/* PAN Upload */}
          <div className="p-6 bg-card rounded-2xl border-2 border-border space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <File className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">PAN Card</h3>
            </div>

            <div className="space-y-3">
              <Label htmlFor="pan-number">PAN Number</Label>
              <Input
                id="pan-number"
                placeholder="ABCDE1234F"
                value={panNumber}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  setPanNumber(value);
                  if (value.length === 10) {
                    validatePAN(value);
                  } else {
                    setPanError("");
                  }
                }}
                maxLength={10}
                className={panError ? "border-destructive" : ""}
              />
              {panError && (
                <p className="text-xs text-destructive mt-1">{panError}</p>
              )}
              {!panError && panNumber.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
                </p>
              )}
              {!panError && panNumber.length === 10 && (
                <p className="text-xs text-accent mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Valid PAN format
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pan-file">Upload PAN</Label>
              <div className="relative">
                <Input
                  id="pan-file"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handlePanUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="pan-file"
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  {panFile ? (
                    <>
                      <Check className="w-5 h-5 text-accent animate-bounce-in" />
                      <span className="text-sm">{panFile.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload
                      </span>
                    </>
                  )}
                </Label>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!aadhaarFile || !panFile || aadhaarNumber.length !== 12 || panNumber.length !== 10}
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl"
          >
            Continue to Video KYC
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
