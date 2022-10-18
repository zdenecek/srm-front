import { GeoObject } from "./GeoObject";
import { DealType, OwnershipType, PropertyCodes, PropertyType } from "./types";

export class FilterObject {
    query?: string;
    priceMin?: number;
    priceMax?: number;
    rentMin?: number;
    rentMax?: number;
    priceDropPercent?: number;
    priceDropCZK?: number;
    pricePerMeterMin?: number;
    pricePerMeterMax?: number;
    rentPerMeterMin?: number;
    rentPerMeterMax?: number;
    ageMin?: number;
    ageMax?: number;
    deleted?: boolean;
    deal: { [key in DealType]?: boolean } = {};
    property: { [key in PropertyType]?: boolean } = {};
    subcategory: { [key: number]: boolean }  = {} ;
    ownership: { [key in OwnershipType]?: boolean } = {};
    location?: GeoObject;


    toParams(): any {
        const obj = {} as any;

        let keys = [
            "query",
            "priceMin",
            "priceMax",
            "rentMin",
            "rentMax",
            "pricePerMeterMin",
            "pricePerMeterMax",
            "rentPerMeterMin",
            "rentPerMeterMax",
            "priceDropPercent",
            "priceDropCZK",
            "ageMin",
            "ageMax",
            "deleted",
        ];

        for (const key of keys) {
            // @ts-ignore
            if (this[key]) obj[key] = this[key];
        }

        keys = ["deal", "property", "subcategory",  "ownership"];

        for (const key of keys) {
            // @ts-ignore
            if (Object.values(this[key]).some((v) => v)) {
                // @ts-ignore
                obj[key] = Object.entries(this[key])
                    .filter(([k, v]) => v)
                    .map(([k, v]) => k);
            }
        }

        /** todo sub */

        if (this.location) {
            obj.lat = this.location.userData.latitude;
            obj.lon = this.location.userData.longitude;
            obj.radius = this.location.radius;
        }

        return obj;
    }
}
