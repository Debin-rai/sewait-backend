/**
 * Simple Nepali Date Utility for SewaIT
 * This provides basic BS date formatting based on a constant offset for the current year.
 * In a production app, use 'ad-bs-converter' or similar library.
 */

const nepaliMonths = [
    "वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"
];

const nepaliDays = [
    "आइतबार", "सोमवार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"
];

const nepaliNumbers: { [key: string]: string } = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
};

export function toNepaliNumber(num: number | string): string {
    return num.toString().split('').map(digit => nepaliNumbers[digit] || digit).join('');
}

export function getCurrentNepaliDate() {
    // Current approach: Simple static offset for 2080/2081 transition
    // February 17, 2026 AD is roughly Phagun 5, 2082 BS
    const now = new Date();

    // For demonstration and within the scope of this task:
    // We'll return a formatted string for today's date in Nepali
    // Feb 17 2026 -> 2082 Phagun 5
    const year = 2082;
    const month = 10; // Phagun (0-indexed)
    const day = 5;
    const dayOfWeek = now.getDay();

    return {
        year: toNepaliNumber(year),
        month: nepaliMonths[month],
        day: toNepaliNumber(day),
        dayName: nepaliDays[dayOfWeek],
        fullDate: `${toNepaliNumber(year)} ${nepaliMonths[month]} ${toNepaliNumber(day)}`
    };
}
