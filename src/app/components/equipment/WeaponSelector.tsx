"use client";

import { useEffect, useState } from "react";

// Define the expected structure of a weapon
interface Weapon {
    id: number;
    name: string;
}

// API endpoint for weapons
const API_URL_WEAPONS = "https://wilds.mhdb.io/en/weapons";

// Predefined weapon types
const weaponTypes = [
    "Great Sword",
    "Long Sword",
    "Sword and Shield",
    "Dual Blades",
    "Hammer",
    "Hunting Horn",
    "Lance",
    "Gunlance",
    "Switch Axe",
    "Charge Blade",
    "Insect Glaive",
    "Bow",
    "Light Bowgun",
    "Heavy Bowgun"
] as const;

export default function WeaponSelector() {
    const [selectedWeapons, setSelectedWeapons] = useState<{ primary: string; secondary: string }>({
        primary: "",
        secondary: "",
    });

    const [activeWeapon, setActiveWeapon] = useState<"primary" | "secondary">("primary");
    const [weaponList, setWeaponList] = useState<Weapon[]>([]); // specifically typed `Weapon[]`
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Convert weapon type to match API requirements
    const formatWeaponTypeForAPI = (type: string): string => {
        if (type === "Sword and Shield") return "sword-shield"; // Special case
        return type.toLowerCase().replace(/\s/g, "-");
    };

    // Fetch weapons when a type is selected
    useEffect(() => {
        if (selectedType) {
            setLoading(true);
            const formattedType = formatWeaponTypeForAPI(selectedType);
            fetch(`${API_URL_WEAPONS}?q={"kind":"${formattedType}"}`)
                .then((res) => res.json())
                .then((data: Weapon[]) => { // Explicitly typing fetched data
                    console.log(`Fetched ${selectedType} weapons:`, data);
                    setWeaponList(data);
                    setLoading(false);
                })
                .catch((e) => {
                    console.error("Error fetching weapons:", e);
                    setLoading(false);
                });
        }
    }, [selectedType]);

    const handleWeaponSelect = (slot: "primary" | "secondary", weapon: string) => {
        setSelectedWeapons((prev) => ({ ...prev, [slot]: weapon }));
        setSelectedType(null); // Close submenu

        // Close the popover after selection
        document.getElementById("weapon-popover")?.hidePopover();
    };

    return (
        <div className="relative flex flex-row flex-wrap items-center justify-evenly gap-5 m-5">
            {/* Weapon Selection Popover */}
            <button
                className="btn btn-secondary"
                popoverTarget="weapon-popover"
                style={{ anchorName: "--anchor-weapon" } as React.CSSProperties}
            >
                {selectedWeapons[activeWeapon] || `Select ${activeWeapon === "primary" ? "Primary" : "Secondary"} Weapon`}
            </button>

            <ul
                className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                popover="auto"
                id="weapon-popover"
                style={{ positionAnchor: "--anchor-weapon" } as React.CSSProperties}
            >
                {!selectedType ? (
                    // Weapon Type Selection (First Menu)
                    weaponTypes.map((type) => (
                        <li key={type}>
                            <button
                                onClick={() => setSelectedType(type)}
                                className="hover:bg-gray-200 transition"
                            >
                                {type}
                            </button>
                        </li>
                    ))
                ) : (
                    <>
                        {/* Back Button */}
                        <li>
                            <button
                                onClick={() => setSelectedType(null)}
                                className="hover:bg-gray-200 transition"
                            >
                                ← Back to Weapon Types
                            </button>
                        </li>

                        {/* Message Indicating Selection */}
                        <li className="p-2 font-semibold text-primary">
                            {selectedType} Weapons
                        </li>

                        {/* Search Bar */}
                        <li className="p-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="input input-bordered w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </li>

                        {/* Weapon List */}
                        <li>
                            <ul className="max-h-60 overflow-y-auto">
                                {loading ? (
                                    <li>Loading...</li>
                                ) : weaponList.length > 0 ? (
                                    weaponList
                                        .filter((weapon) =>
                                            weapon.name.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((weapon) => (
                                            <li key={weapon.id}>
                                                <button
                                                    onClick={() => handleWeaponSelect(activeWeapon, weapon.name)}
                                                    className="hover:bg-gray-200 transition"
                                                >
                                                    {weapon.name}
                                                </button>
                                            </li>
                                        ))
                                ) : (
                                    <li>No weapons available</li>
                                )}
                            </ul>
                        </li>
                    </>
                )}
            </ul>

            {/* Active Weapon Display */}
            <p className="text-lg font-semibold">
                Active Weapon: <span className="text-secondary">{selectedWeapons[activeWeapon] || "None Selected"}</span>
            </p>

            {/* Active Weapon Toggle */}
            <button
                className="btn btn-neutral"
                onClick={() => setActiveWeapon((prev) => (prev === "primary" ? "secondary" : "primary"))}
            >
                Switch to {activeWeapon === "primary" ? "Secondary" : "Primary"} Weapon
            </button>
        </div>
    );
}
