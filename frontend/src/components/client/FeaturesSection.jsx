// src/components/FeaturesSection.jsx
import { Car, Shield, Repeat2, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Car,
    title: "Free Shipping",
    subtitle: "Hỏa tốc trong 2h",
    color: "bg-orange-500",
  },
  {
    icon: Shield,
    title: "Security Payment",
    subtitle: "Giao dịch an toàn",
    color: "bg-orange-500",
  },
  {
    icon: Repeat2,
    title: "30 Day Return",
    subtitle: "Đổi trả miễn phí",
    color: "bg-orange-500",
  },
  {
    icon: PhoneCall,
    title: "24/7 Support",
    subtitle: "Hỗ trợ nhiệt tình",
    color: "bg-orange-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-6 text-center border-none shadow-none bg-gray-100 hover:shadow-lg transition duration-300"
            >
              <div
                className={`p-4 rounded-full ${feature.color} text-white mb-3`}
              >
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-base text-gray-500">{feature.subtitle}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
