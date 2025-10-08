import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "./Confetti";

interface BadgeUnlockProps {
  badgeName: string;
  description: string;
  onComplete?: () => void;
}

const BadgeUnlock = ({ badgeName, description, onComplete }: BadgeUnlockProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <>
      <Confetti />
      <div className="fixed inset-0 bg-secondary/90 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
        <div className="bg-card p-8 rounded-3xl shadow-xl max-w-sm mx-4 text-center animate-bounce-in">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-gold to-primary rounded-full flex items-center justify-center shadow-xl">
              <Award className="w-12 h-12 text-white animate-sparkle" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Badge Unlocked!
          </h2>
          <p className="text-xl font-semibold text-primary mb-2">{badgeName}</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};

export default BadgeUnlock;
