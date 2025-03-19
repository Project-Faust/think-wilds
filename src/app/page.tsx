import StatusSheet from "./components/build/StatusSheet";
import ArmorSelector from "./components/equipment/ArmorSelector";
import TalismanSelector from "./components/equipment/TalismanSelector";
import WeaponSelector from "./components/equipment/WeaponSelector";

// Testing components
// import TalismanTest from "./components/devTestComponents/TalismanTest";

export default function Home() {
  return (
    <div>
      <header className="text-center bg-base-300 text-base-content mx-0 mt-0 mb-5 p-5">
        <h1 className="text-4xl font-bold">Think Wilds</h1>
        <p className="text-xl">A community-made set builder for Monster Hunter: Wilds</p>
      </header>
      <WeaponSelector />
      <ArmorSelector />
      <TalismanSelector />
      <StatusSheet />

      {/* Testing Components */}
      {/* <TalismanTest /> */}
    </div>
  );
}
