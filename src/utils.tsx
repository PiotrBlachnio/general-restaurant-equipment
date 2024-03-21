const toTitleCase = (text: string): string => {
    return text.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
};

const getRandomArrayElements = (arr: any[], count: number): any[] => {
    const shuffled = [...arr] as any;

    let i: number = arr.length;

    const min = i - count > 0 ? i - count : 0;

    let temp: any;

    let index: number;

    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());

        temp = shuffled[index];

        shuffled[index] = shuffled[i];

        shuffled[i] = temp;
    }

    return shuffled.slice(min);
};

const abbreviationToState = (abbreviation: string): string => {
    const abbreviations = {
        AZ: "Arizona",
        AL: "Alabama",
        AK: "Alaska",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DC: "District of Columbia",
        DE: "Delaware",
        FL: "Florida",
        GA: "Georgia",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MT: "Montana",
        NE: "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wisconsin",
        WY: "Wyoming",
    };

    return abbreviations[abbreviation];
};

export const Utils = {
    toTitleCase,
    getRandomArrayElements,
    abbreviationToState
};
