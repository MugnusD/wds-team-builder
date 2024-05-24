declare interface CharacterDetail {
    id: number;
    name: string;
    rarity: CharacterRarity;
    attribute: AttributeType;
    status: CharacterStatusDetail[];
    characterBase: CharacterName;
    characterBaseChinese: string;
    starAct: StarActDetail;
    sense: SenseDetail;
    bloomBonuses: BloomBonusDetail[];
    displayStartAt: Date;
    event: string;
    gacha: string;
    episodes: CharacterEpisodeDetail[];
}

declare type CharacterName =
    | "鳳ここな"
    | "静香"
    | "カトリナ・グリーベル"
    | "新妻八恵"
    | "柳場ぱんだ"
    | "流石知冴"
    | "連尺野初魅"
    | "烏森大黒"
    | "舎人仁花子"
    | "萬容"
    | "筆島しぐれ"
    | "千寿暦"
    | "ラモーナ・ウォルフ"
    | "王雪"
    | "リリヤ・クルトベイ"
    | "与那国緋花里"
    | "千寿いろは"
    | "白丸美兎"
    | "阿岐留カミラ"
    | "猫足蕾"
    | "本巣叶羽";

declare type CharacterRarity = 'Rare1' | 'Rare2' | 'Rare3' | 'Rare4';

declare type SenseType = 'Support' | 'Amplification' | 'Special' | 'Control' | 'None' | 'Alternative';

declare type AttributeType = 'Cute' | 'Cool' | 'Colorful' | 'Cheerful';

interface BloomBonusDetail {
    phase: number;
    descriptions: string[];
    descriptionsChinese: string[];
}

interface SenseDetail {
    descriptions: string[];
    descriptionsChinese: string[];
    type: SenseType;
    lightCount: number;
    acquirableGauge: number;
    coolTime: {
        origin: number;
        bloom: number;
    };
    effectTypes: string[];
}

interface StarActDetail {
    descriptions: string[];
    descriptionsChinese: string[];
    conditions: StarActLightCondition[];
}
interface StarActLightCondition {
    type: string;
    typeChinese: string;
    origin: number;
    bloom: number;
}

interface CharacterEpisodeDetail {
    id: number;
    episodeOrder: string;
}
declare enum CharacterEpisodeStatus {
    NONE = "None",
    FIRST = "First",
    SECOND = "Second"
}

interface CharacterStatusPreset {
    level?: number;
    awakening?: boolean;
    episode?: CharacterEpisodeStatus;
    bloom?: number;
}
declare interface CharacterStatusDetail {
    preset: CharacterStatusPreset;
    status: {
        vocal: number;
        expression: number;
        concentration: number;
    };
}

