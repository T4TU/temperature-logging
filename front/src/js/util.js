export const parseMeasurementData = (csv) => {
    let data = [];
    const lines = csv.split("\n");
    for (const line of lines) {
        const values = line.split(" ");
        if (values.length !== 3) {
            continue;
        }
        const time = values[0].slice(0, 5);
        const temperature = parseFloat(values[1]);
        const humidity = parseFloat(values[2]);
        data.push({
            time: time,
            temperature: temperature,
            humidity: humidity,
        });
    }
    return data;
};

export const parseExternalData = (xml) => {
    const parser = new DOMParser();
    const parsedXML = parser.parseFromString(xml, "text/xml");
    const elements = parsedXML.getElementsByTagName("BsWfs:BsWfsElement");
    return Array.from(elements).map(e => (
        {
            time: e.childNodes[3].innerHTML,
            temperature: parseFloat(e.childNodes[7].innerHTML)
        }
    ));
}

export function beginningOfToday() {
    const time = new Date();
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time.toISOString();
}

function zeroPad(num, width) {
    const initial = `${num}`
    const initialWidth = initial.length;
    return "0".repeat(width - initialWidth) + initial;
}

export class LogDate {

    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    asString() {
        return `${this.year}-${zeroPad(this.month, 2)}-${zeroPad(this.day, 2)}`;
    }

    asFriendlyString() {
        return `${this.day}.${this.month}.${this.year}`;
    }

    static fromString(dateString) {
        if (!dateString) {
            return null;
        }
        const e = dateString.split("-");
        if (e.length !== 3) {
            return null;
        }
        const year = parseInt(e[0], 10);
        const month = parseInt(e[1], 10);
        const day = parseInt(e[2], 10);
        if (year.isNaN || month.isNaN || day.isNaN) {
            return null;
        }
        if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
        }
        return new LogDate(year, month, day);
    }

    static current() {
        const currentDate = new Date();
        return new LogDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    }
}
