import React from "react";
import {
  ShieldCheck,
  Gem,
  Compass,
  Award,
  Brain,
  BarChart3,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Activity,
  Lock,
  User,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  Download,
  Mail,
  MessageCircle,
  HelpCircle
} from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = "", size = 24 }) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    ShieldCheck,
    Gem,
    Compass,
    Award,
    Brain,
    BarChart3,
    Sparkles,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Activity,
    Lock,
    User,
    ChevronRight,
    RefreshCw,
    AlertTriangle,
    Download,
    Mail,
    MessageCircle
  };

  const IconComponent = iconMap[name] || HelpCircle;

  return <IconComponent className={className} size={size} />;
};
