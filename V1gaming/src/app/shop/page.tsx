import CafeAndGear from "@/components/CafeAndGear/CafeAndGear";

export default function Shop() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Cafe & <span className="text-violet-400">Gear Shop</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Fuel up with premium snacks and energy drinks, or upgrade your setup with our curated selection of high-end gaming peripherals.</p>
      </div>
      <CafeAndGear />
    </main>
  );
}
