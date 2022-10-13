export type DealType = 1 | 2 | 3;
export enum Deal {
    "sell" = 1,
    "rent" = 2,
    "auction" = 3,
}

export type PropertyType = 1 | 2 | 3 | 4 | 5;
export enum Property {
    "apartment" = 1,
    "house" = 2,
    "parcel" = 3,
    "commercial" = 4,
    "other" = 5,
}

export type SubCategoryType = 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export enum SubCategory {
    "1+kk" = 2,
    "1+1" = 3,
    "2+kk" = 4,
    "2+1" = 5,
    "3+kk" = 6,
    "3+1" = 7,
    "4+kk" = 8,
    "4+1" = 9,
    "5+kk" = 10,
    "5+1" = 11,
    "6-a-vice" = 12,
    "not-present" = 0,
}

export type OwnershipType = 0 | 1 | 2 | 3;
export enum Ownership {
    "Osobní" = 1,
    "Družstevní" = 2,
    "Statní/Obecní" = 3,
    "not-present" = 0,
}
