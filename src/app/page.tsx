import ArmorSelector from "./components/equipment/ArmorSelector";
import WeaponSelector from "./components/equipment/WeaponSelector";

export default function Home() {
  return (
    <div>
      <header className="text-center bg-black mx-0 mt-0 mb-5 p-5">
        <h1 className="text-4xl font-bold mb-3">Think Wilds</h1>
        <p className="text-xl">A community-made set builder for Monster Hunter: Wilds</p>
      </header>
      <WeaponSelector />
      <ArmorSelector />
    </div>
  );
}
