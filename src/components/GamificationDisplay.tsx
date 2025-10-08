import { Trophy, Star, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface GamificationDisplayProps {
  totalPoints: number;
  recentPoints?: number;
  className?: string;
}

const GamificationDisplay = ({
  totalPoints,
  recentPoints,
  className,
}: GamificationDisplayProps) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Total Points */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 px-4 py-2 rounded-full border border-gold/30">
        <Coins className="w-5 h-5 text-gold animate-sparkle" />
        <span className="font-bold text-gold">{totalPoints}</span>
        <span className="text-sm text-gold-foreground">Points</span>
      </div>

      {/* Recent Points Animation */}
      {recentPoints && recentPoints > 0 && (
        <div className="flex items-center gap-1 text-accent animate-bounce-in">
          <Star className="w-4 h-4 fill-accent" />
          <span className="font-bold">+{recentPoints}</span>
        </div>
      )}
    </div>
  );
};

export default GamificationDisplay;
