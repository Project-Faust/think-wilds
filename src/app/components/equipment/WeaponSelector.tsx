"use client";
import { useState } from "react";
import { weaponTypes } from "./data";

export default function WeaponSelector() {
    const [selectedWeapon, setSelectedWeapon] = useState<string>("");

    return (
        <div className="relative">
            <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn m-1">Click ➡️</div>
                <button
                    tabIndex={0}
                    className="btn btn-primary">
                    (selectedWeapon || "Select Weapon")
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {weaponTypes.map((weapon) => (
                        <li key={weapon}>
                            <button onClick={() => setSelectedWeapon(weapon)}>{weapon}</button>
                        </li>
                    ))};
                </ul>
            </div>
        </div >
    )
};