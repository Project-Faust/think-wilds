import { create } from "zustand";

interface Skill {
    mame: string;
    level: number;
}

interface ArmorStats {
    defense: number;
    skills: Skill[]

}

interface TalismanStats {
    skills: Skill[]
}

interface EquipmentState {
    armor: ArmorStats;
    talisman: TalismanStats;
    setArmor: (armor: ArmorStats) => void;
    setTalisman: (talisman: TalismanStats) => void;
}

const useEquipmentStore = create<EquipmentState>((set) => ({
    armor: {
        defense: 0,
        skills: [],
    },
    talisman: {
        skills: [],
    },
    setArmor: (armor) => set({ armor }),
    setTalisman: (talisman) => set({ talisman }),
}));

export default useEquipmentStore;