
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  className?: string;
  iconClassName?: string;
}

export const ModuleCard = ({
  title,
  description,
  icon: Icon,
  to,
  className,
  iconClassName,
}: ModuleCardProps) => {
  return (
    <Link to={to} className="block transition-transform hover:scale-[1.02] focus:outline-none">
      <Card className={cn("card-gradient h-full cursor-pointer border-border/50", className)}>
        <CardHeader className="pb-2">
          <div className={cn("mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20", iconClassName)}>
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <span className="text-sm font-medium text-primary">Explore →</span>
        </CardContent>
      </Card>
    </Link>
  );
};
