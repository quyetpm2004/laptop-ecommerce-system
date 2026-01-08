import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function DashboardCard({ title, count, url }) {
  return (
    <Card
      className={cn("border-none overflow-hidden shadow-md pb-0 bg-[#f8f8f8]")}
    >
      <CardContent>
        <h3 className="text-xl font-medium">
          {title} ({count})
        </h3>
      </CardContent>

      <CardFooter
        className={cn(
          "flex justify-between items-center pb-3 px-6 cursor-pointer hover:opacity-90 transition-opacity"
        )}
      >
        <Link
          to={url}
          className="text-sm font-light underline underline-offset-4"
        >
          View Details
        </Link>
        <ChevronRight className="h-4 w-4" />
      </CardFooter>
    </Card>
  );
}
