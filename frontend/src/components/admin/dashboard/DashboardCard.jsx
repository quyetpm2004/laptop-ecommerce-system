import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "User",
    count: 14,
    color: "bg-[#0d6efd]", // Blue
    footerColor: "bg-[#0b5ed7]",
  },
  {
    title: "Product",
    count: 11,
    color: "bg-[#dc3545]", // Red
    footerColor: "bg-[#bb2d3b]",
  },
  {
    title: "Order",
    count: 10,
    color: "bg-[#198754]", // Green
    footerColor: "bg-[#157347]",
  },
];

export function DashboardCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((item) => (
        <Card
          key={item.title}
          className={cn(
            "border-none overflow-hidden shadow-md pb-0 bg-[#f8f8f8]"
          )}
        >
          <CardContent>
            <h3 className="text-xl font-medium">
              {item.title} ({item.count})
            </h3>
          </CardContent>

          <CardFooter
            className={cn(
              "flex justify-between items-center pb-3 px-6 cursor-pointer hover:opacity-90 transition-opacity"
            )}
          >
            <span className="text-sm font-light underline underline-offset-4">
              View Details
            </span>
            <ChevronRight className="h-4 w-4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
