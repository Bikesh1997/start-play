import { useState } from "react";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import OTPVerification from "@/components/onboarding/OTPVerification";
import PersonalDetails from "@/components/onboarding/PersonalDetails";
import AddressVerification from "@/components/onboarding/AddressVerification";
import AccountTypeSelection from "@/components/onboarding/AccountTypeSelection";
import ConsentDeclaration from "@/components/onboarding/ConsentDeclaration";
import DocumentUpload from "@/components/onboarding/DocumentUpload";
import VideoKYC from "@/components/onboarding/VideoKYC";
import KYCStatus from "@/components/onboarding/KYCStatus";

const ONBOARDING_STEPS = [
  { id: 1, label: "Verify", completed: false },
  { id: 2, label: "Details", completed: false },
  { id: 3, label: "Address", completed: false },
  { id: 4, label: "Account", completed: false },
  { id: 5, label: "Consent", completed: false },
];

const KYC_STEPS = [
  { id: 1, label: "Documents", completed: false },
  { id: 2, label: "Video", completed: false },
  { id: 3, label: "Complete", completed: false },
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [recentPoints, setRecentPoints] = useState(0);
  const [onboardingSteps, setOnboardingSteps] = useState(ONBOARDING_STEPS);
  const [kycSteps, setKycSteps] = useState(KYC_STEPS);

  const updateSteps = (steps: typeof ONBOARDING_STEPS | typeof KYC_STEPS, currentIndex: number) => {
    return steps.map((step, idx) => ({
      ...step,
      completed: idx < currentIndex,
    }));
  };

  const handleNext = (pointsEarned: number = 0) => {
    if (pointsEarned > 0) {
      setTotalPoints((prev) => prev + pointsEarned);
      setRecentPoints(pointsEarned);
      setTimeout(() => setRecentPoints(0), 2000);
    }

    if (currentScreen < 5) {
      setOnboardingSteps(updateSteps(ONBOARDING_STEPS, currentScreen));
    } else if (currentScreen >= 6 && currentScreen < 8) {
      setKycSteps(updateSteps(KYC_STEPS, currentScreen - 6));
    }

    setCurrentScreen((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentScreen((prev) => Math.max(0, prev - 1));
  };

  const screens = [
    <WelcomeScreen key="welcome" onStart={() => handleNext()} />,
    <OTPVerification
      key="otp"
      onVerify={() => handleNext(20)}
      onBack={handleBack}
      totalPoints={totalPoints}
      currentStep={0}
      steps={onboardingSteps}
    />,
    <PersonalDetails
      key="personal"
      onNext={() => handleNext(15)}
      onBack={handleBack}
      totalPoints={totalPoints}
      recentPoints={recentPoints}
      currentStep={1}
      steps={onboardingSteps}
    />,
    <AddressVerification
      key="address"
      onNext={() => handleNext(15)}
      onBack={handleBack}
      totalPoints={totalPoints}
      recentPoints={recentPoints}
      currentStep={2}
      steps={onboardingSteps}
    />,
    <AccountTypeSelection
      key="account"
      onNext={() => handleNext(20)}
      onBack={handleBack}
      totalPoints={totalPoints}
      recentPoints={recentPoints}
      currentStep={3}
      steps={onboardingSteps}
    />,
    <ConsentDeclaration
      key="consent"
      onNext={() => handleNext(30)}
      onBack={handleBack}
      totalPoints={totalPoints}
      recentPoints={recentPoints}
      currentStep={4}
      steps={onboardingSteps}
    />,
    <DocumentUpload
      key="documents"
      onNext={() => handleNext(50)}
      onBack={handleBack}
      totalPoints={totalPoints}
      recentPoints={recentPoints}
      currentStep={0}
      steps={kycSteps}
    />,
    <VideoKYC
      key="video"
      onNext={() => handleNext(100)}
      onBack={handleBack}
      totalPoints={totalPoints}
      recentPoints={recentPoints}
      currentStep={1}
      steps={kycSteps}
    />,
    <KYCStatus
      key="status"
      onComplete={() => handleNext(200)}
      totalPoints={totalPoints + 200}
      currentStep={2}
      steps={kycSteps}
    />,
  ];

  return <div className="max-w-md mx-auto">{screens[currentScreen]}</div>;
};

export default Index;
