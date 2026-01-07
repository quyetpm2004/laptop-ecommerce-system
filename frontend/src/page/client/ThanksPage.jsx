import FeaturesSection from "@/components/client/FeaturesSection";

function ThanksPage() {
  return (
    <main>
      <div className="bg-white py-4 font-sm mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="bg-[#d1e7dd] p-4 rounded">
          Cảm ơn bạn đã đặt hàng, đơn hàng đã được xác nhận thành công{" "}
        </p>
      </div>
      <FeaturesSection />
    </main>
  );
}

export default ThanksPage;
