interface AccessoryDetail {
    id: number;
    name: string;
    rarity: AccessoryRarity;
    effects: AccessoryEffectDetail[];
    randomEffects: AccessoryEffectDetail[];
}
interface AccessoryEffectDetail {
    name: string;
    description: string;
    descriptionChinese: string;
}

type AccessoryRarity = 'R' | 'SR' | 'SSR';