export interface APIResource {
    _id: string;
    index: number;
}

export interface NamedAPIResource extends APIResource {
    name: string;
    url: string;
}

export interface ClassAPIResource extends APIResource {
    class: string;
    url: string;
}
export interface Choice {
    choose: number;
    type: string;
    from: Array<APIResource>;
}

export interface Cost {
    quantity: number;
    unit: CurrencyTypes;
}

export enum CurrencyTypes {
    Copper = 'cp',
    Silver = 'sp',
    Gold = 'gp',
    Platinum = 'pp',
}

export interface Equipment extends NamedAPIResource {
    equipment_category: EquipmentCategory;
    cost: Cost;
    weight?: number;
}
export enum EquipmentCategory {
    Weapon = 'Weapon',
    Armor = 'Armor',
    AdventuringGear = 'Adventuring Gear',

}

export enum WeaponCategory {

}

export interface WeaponDamage {
    dice_count: number;
    dice_value: number;
    damage_type: NamedAPIResource;
}

export interface WeaponRange {
    normal ?: number;
    long ?: number;
    short ?: number;
}

export interface Weapon extends NamedAPIResource {
    equipment_category: EquipmentCategory;
    weapon_category: WeaponCategory;
}
