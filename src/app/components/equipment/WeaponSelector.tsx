"use client";
import { useEffect, useState } from "react";
import { weaponTypes } from "./data";

export default function WeaponSelector() {
    const [selectedWeapons, setSelectedWeapons] = useState<{ primary: string; secondary: string }>({
        primary: "",
        secondary: "",
    });

    const [activeWeapon, setActiveWeapon] = useState<"primary" | "secondary">("primary");

    const handleWeaponSelect = (slot: "primary" | "secondary", weapon: string) => {
        setSelectedWeapons((prev) => ({ ...prev, [slot]: weapon }));
    };

    return (
        <div className="flex flex-col items-center gap-10 m-10">
            {/* Weapon Selectors */}
            {(["primary", "secondary"] as const).map((slot) => (
                <div key={slot} className="relative">
                    <div className="dropdown dropdown-right">
                        <button tabIndex={0} className={`btn ${activeWeapon === slot ? "btn-primary" : "btn-secondary"}`}>
                            {selectedWeapons[slot] || `Select ${slot === "primary" ? "Primary" : "Secondary"} Weapon`}
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
                            {weaponTypes.map((weapon) => (
                                <li key={weapon}>
                                    <button onClick={() => handleWeaponSelect(slot, weapon)}>{weapon}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}

            {/* Active Weapon Toggle */}
            <button
                className="btn btn-accent"
                onClick={() => setActiveWeapon((prev) => (prev === "primary" ? "secondary" : "primary"))}
            >
                Switch to {activeWeapon === "primary" ? "Secondary" : "Primary"} Weapon
            </button>

            {/* Active Weapon Display */}
            <p className="text-lg font-semibold">
                Active Weapon: <span className="text-primary">{selectedWeapons[activeWeapon] || "None Selected"}</span>
            </p>
        </div>
    );
}