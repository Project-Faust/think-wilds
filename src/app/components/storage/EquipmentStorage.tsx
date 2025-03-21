import { create } from "zustand";

interface Skill {
    name: string;
    level: number;
}

interface ArmorStats {
    id: number;
    name: string;
    defense: {
        base: number;
    }
    resistances: {
        fire: number;
        water: number;
        ice: number;
        thunder: number;
        dragon: number;
    };
    skills: Skill[];
}

interface TalismanStats {
    skills: Skill[]
}

interface BuffsState {
    inventoryCharms: {
        armorCharm: boolean;
        powerCharm: boolean;
    };
    conditionalSkills: {
        agitator: boolean;
        maxMight: boolean;
        peakPerformance: boolean;
        heroics: boolean;
        latentPower: boolean;
    };
    consumableBuffs: {
        demonDrug: boolean;
        megaDemonDrug: boolean;
        mightSeed: boolean;
        mightPill: boolean;
        armorSkin: boolean;
        megaArmorSkin: boolean;
        adamantSeed: boolean;
        adamantPill: boolean;
    };
    toggleInventoryCharm: (charm: keyof BuffsState["inventoryCharms"]) => void;
    toggleConditionalSkill: (skill: keyof BuffsState["conditionalSkills"]) => void;
    toggleConsumableBuff: (buff: keyof BuffsState["consumableBuffs"]) => void;
}

interface EquipmentState extends BuffsState {
    armor: ArmorStats | null;
    talisman: TalismanStats;
    setArmor: (armor: ArmorStats) => void;
    setTalisman: (talisman: TalismanStats) => void;
}

const useEquipmentStore = create<EquipmentState>((set) => ({
    armor: null,
    talisman: {
        skills: [],
    },

    setArmor: (armor) =>
        set({
            armor: {
                id: armor.id,
                name: armor.name,
                defense: {
                    base: armor.defense.base,
                },
                resistances: armor.resistances,
                skills: armor.skills.map((skill) => ({
                    name: skill.name,
                    level: skill.level,
                })),
            },
        }),

    setTalisman: (talisman) => set({ talisman }),

    // Buffs & Conditionals

    // inventory charms are permanent on a per-hunt basis
    // state depends on if user has charms or not
    // assume hunters using this app have charms by default
    inventoryCharms: {
        armorCharm: true,
        powerCharm: true,
    },

    // assumed to not be persistent throughout an entire hunt
    // enable all applicable to see the stars align
    conditionalSkills: {
        agitator: false,
        maxMight: false,
        peakPerformance: false,
        heroics: false,
        latentPower: false,
    },

    // TO-DO:
    // each subtype should be mutually exclusive
    // assume armorSkin and demonDrug due to ease of accessibility
    consumableBuffs: {
        demonDrug: true,
        megaDemonDrug: false,
        mightSeed: false,
        mightPill: false,
        armorSkin: true,
        megaArmorSkin: false,
        adamantSeed: false,
        adamantPill: false,
    },

    toggleInventoryCharm: (charm) =>
        set((state) => ({
            inventoryCharms: { ...state.inventoryCharms, [charm]: !state.inventoryCharms[charm] },
        })),

    toggleConditionalSkill: (skill) =>
        set((state) => ({
            conditionalSkills: { ...state.conditionalSkills, [skill]: !state.conditionalSkills[skill] },
        })),

    toggleConsumableBuff: (buff) =>
        set((state) => ({
            consumableBuffs: { ...state.consumableBuffs, [buff]: !state.consumableBuffs[buff] },
        })),
}));

export default useEquipmentStore;
