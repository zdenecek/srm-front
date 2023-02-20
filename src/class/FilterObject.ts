import { GeoObject } from "./GeoObject";
import { DealType, OwnershipType, PropertyType } from "./types";

export type OrderingOption = "priceDrop" | "age" | "price" | "pricePerMeter";
export type DeletedOption = "deleted" | "active" | "all";

export class Ordering {
    key: OrderingOption;
    desc: boolean;

    constructor(key: OrderingOption, desc: boolean) {
        this.key = key;
        this.desc = desc;
    }

    public toString(): string {
        return `${this.key}:${this.desc}`;
    }

    static fromString(s: string): Ordering {
        const split = s.split(":");
        return new Ordering(split[0] as OrderingOption, split[1] !== "0");
    }
}

export class FilterObject {
    query?: string;
    priceMin?: number;
    priceMax?: number;
    rentMin?: number;
    rentMax?: number;
    priceDropPercent?: number;
    priceDropCzk?: number;
    pricePerMeterMin?: number;
    pricePerMeterMax?: number;
    rentPerMeterMin?: number;
    rentPerMeterMax?: number;
    ageMin?: number;
    ageMax?: number;
    deleted?: DeletedOption;
    deal: { [key in DealType]?: boolean } = {};
    property: { [key in PropertyType]?: boolean } = {};
    subcategory: { [key: number]: boolean } = {};
    ownership: { [key in OwnershipType]?: boolean } = {};
    location?: GeoObject;
    orderBy = new Array<Ordering>();

    toParams(): Record<string, unknown> {
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
            "priceDropCzk",
            "ageMin",
            "ageMax",
        ];

        for (const key of keys) {
            // @ts-ignore
            if (this[key]) obj[key] = this[key];
        }

        // @ts-ignore
        if(this["deleted"] && this["deleted"] !== "active") obj["deleted"] = this["deleted"];

        keys = ["deal", "property", "subcategory", "ownership"];

        for (const key of keys) {
            // @ts-ignore
            if (Object.values(this[key]).some((v) => v)) {
                // @ts-ignore
                obj[key] = Object.entries(this[key])
                    .filter(([, v]) => v)
                    .map(([k,]) => k);
            }
        }

        /** todo sub */

        if (this.location) {
            obj.lat = this.location.userData.latitude;
            obj.lon = this.location.userData.longitude;
            obj.radius = this.location.radius;
        }

        if (this.orderBy.length > 0) {
            const o = new Set();
            obj.orderBy = [];
            this.orderBy.forEach((e, i) => {
                if (o.has(e.key)) return;
                o.add(e.key);
                obj.orderBy.push(`${i}:${e.key}:${e.desc ? "desc" : "asc"}`);
            });
        }

        return obj;
    }

    static fromParams(params: Record<string, unknown>): FilterObject {
        const f = new FilterObject();

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
            "priceDropCzk",
            "ageMin",
            "ageMax",
            
        ];

        for (const key of keys) {
            // @ts-ignore
            if (params[key]) f[key] = params[key];
        }
        // @ts-ignore
        if(params["deleted"] && params["deleted"] !== "active") f["deleted"] = params["deleted"];

        keys = ["deal", "property", "subcategory", "ownership"];

        for (const key of keys) {
            // @ts-ignore
            if (key in params) {
                // @ts-ignore
                for (const s of params[key].split(",")) {
                    // @ts-ignore
                    f[key][s] = true;
                }
            }
        }

        if ("lat" in params) {
            f.location = {
                // @ts-ignore
                userData: {
                    latitude: parseFloat(params.lat as string),
                    longitude: parseFloat(params.lon as string),
                    suggestFirstRow: `<z dřív. vyhledávání>`,
                },
                radius: parseInt(params.radius as string) ?? 10,
            };
        }

        // @ts-ignore
        if ("orderBy" in params) {
            f.orderBy = [];

            if (Array.isArray(params.orderBy) && params.orderBy.length > 0) {
                // @ts-ignore
                const list = params.orderBy.map((o) => o.split(":"));
                list.forEach((o) => (o[0] = parseInt(o[0])));
                // @ts-ignore
                list.sort((o) => o[0]);
                // @ts-ignore
                f.orderBy = list.map((o) => new Ordering(o[1], o[2] === "desc"));
            } else {
                // @ts-ignore
                const split = params.orderBy.split(":");
                f.orderBy.push(new Ordering(split[1], split[2] === "desc"));
            }
        }

        return f;
    }
}
