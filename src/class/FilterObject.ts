import { GeoObject } from "./GeoObject";
import { DealType, OwnershipType, PropertyType, SubCategoryType } from "./types";

export class FilterObject {
    query?: string;
    priceMin?: number;
    priceMax?: number;
    priceDropPercent?: number;
    priceDropCZK?: number;
    pricePerMeterMin?: number;
    pricePerMeterMax?: number;
    ageMin?: number;
    ageMax?: number;
    deal: { [key in DealType]?: boolean } = {};
    property: { [key in PropertyType]?: boolean } = {};
    sub: { [key in SubCategoryType]?: boolean } = {};
    ownership: { [key in OwnershipType]?: boolean } = {};
    location?: GeoObject;

    toParams(): any {
        const obj = {} as any;

        let keys = [
            "query",
            "priceMin",
            "priceMax",
            "priceDropPercent",
            "priceDropCZK",
            "pricePerMeterMin",
            "pricePerMeterMax",
            "ageMin",
            "ageMax",
        ];

        for (const key of keys) {
            // @ts-ignore
            if (this[key]) obj[key] = this[key];
        }

        keys = ["deal", "property", "sub", "ownership"];

        for (const key of keys) {
            // @ts-ignore
            if (Object.values(this[key]).some((v) => v)) {
                // @ts-ignore
                obj[key] = Object.entries(this[key])
                    .filter(([k, v]) => v)
                    .map(([k, v]) => k);
            }
        }

        if (this.location) {
            obj.lat = this.location.userData.latitude;
            obj.lon = this.location.userData.longitude;
            obj.radius = this.location.radius;
        }

        return obj;
    }
}
