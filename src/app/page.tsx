import ArmorSelector from "./components/equipment/ArmorSelector";
import TalismanSelector from "./components/equipment/TalismanSelector";
import WeaponSelector from "./components/equipment/WeaponSelector";

export default function Home() {
  return (
    <div>
      <header className="text-center bg-base-100 text-white mx-0 mt-0 mb-5 p-5">
        <h1 className="text-4xl font-bold">Think Wilds</h1>
        <p className="text-xl">A community-made set builder for Monster Hunter: Wilds</p>
      </header>
      <WeaponSelector />
      <ArmorSelector />
      <TalismanSelector />
    </div>
  );
}
