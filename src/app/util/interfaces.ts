export interface APIResource {
    _id: string;
    index: number;
}

export interface NamedAPIResource extends APIResource {
    name: string;
    url: string;
}

export interface NamedAPIResourceReference {
    name: string;
    url: string;
}

export interface ClassAPIResource extends APIResource {
    class: string;
    url: string;
}

export interface ClassAPIResourceReference {
    class: string;
    url: string;
}
export interface Choice {
    choose: number;
    type: string;
    from: Array<NamedAPIResourceReference>;
}

export interface Cost {
    quantity: number;
    unit: CURRENCY;
}

export enum CURRENCY {
    COPPER = 'cp',
    SILVER = 'sp',
    GOLD = 'gp',
    PLATINUM = 'pp',
}

export enum SIZE {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large'
}

export enum PROFICIENCY_TYPES {
    WEAPON = 'Weapons',
    SKILLS = 'Skills',
    ARMOR = 'Armor',
    EQUIPMENT = 'Equipment'
}
export interface Proficiency extends NamedAPIResource {
    type: PROFICIENCY_TYPES;
    classes: Array<NamedAPIResourceReference>;
    races: Array<Race>;
}

export interface Race extends NamedAPIResource {
    speed: number;
    ability_bonuses: Array<number>;
    alignment: string;
    size: SIZE;
    size_description?: string;
    starting_proficiencies?: Array<NamedAPIResourceReference>;
    starting_proficiency_options?: Choice;
    languages?: Array<NamedAPIResourceReference>;
    language_desc?: string;
    traits?: Array<NamedAPIResourceReference>;
    subraces?: Array<NamedAPIResourceReference>;
}
export interface Equipment extends NamedAPIResource {
    equipment_category: EQUIPMENT_CATEGORY;
    cost: Cost;
    weight?: number;
    desc?: string;
}
export enum EQUIPMENT_CATEGORY {
    WEAPON = 'Weapon',
    ARMOR = 'Armor',
    ADVENTURING_GEAR = 'Adventuring Gear',
}

export enum WEAPON_CATEGORY {

}

export interface Skill extends NamedAPIResourceReference {
    desc?: string[];
    ability_score: NamedAPIResourceReference;
}
export interface Class extends NamedAPIResource {
    hit_die: number;
    proficiency_choices: Choice[];
    proficiencies: Array<Proficiency>;
    skills?: Array<Skill>;
}

export interface WeaponDamage {
    dice_count: number;
    dice_value: number;
    damage_type: NamedAPIResourceReference;
}

export interface WeaponRange {
    normal?: number;
    long?: number;
    short?: number;
}

export interface Weapon extends NamedAPIResource {
    equipment_category: EQUIPMENT_CATEGORY;
    weapon_category: WEAPON_CATEGORY;
}

export enum LANGUAGE_TYPE {
    COMMON = 'Common',
    EXOTIC = 'Exotic'
}

export interface Langauge extends NamedAPIResource {
    type: LANGUAGE_TYPE;
    typical_speakers?: Array<string>;
    script: string;
}

export enum CLASSES {
    BARBARIAN = 'Barbarian',
    BARD = 'Bard',
    CLERIC = 'Cleric',
    DRUID = 'Druid',
    FIGHTER = 'Fighter',
    MONK = 'Monk',
    PALADIN = 'Paladin',
    RANGER = 'Ranger',
    ROGUE = 'Rogue',
    SORCERER = 'Sorcerer',
    WARLOCK = 'Warlock',
    WIZARD = 'Wizard'
}

export interface ClassReference extends NamedAPIResourceReference {
    icon?: string;
}
