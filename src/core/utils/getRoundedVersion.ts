export function getRoundedVersion(floatVersion: number): number {

    const epsilon = Number.EPSILON;

    function roundFloat(value: number, precision: number): number {
        const factor = Math.pow(10, precision);
        return Math.round(value * factor) / factor;
    }

    function isCloseEnough(a: number, b: number ): boolean {
        return Math.abs(a - b) < epsilon;
    }

    function adjustPrecision(value: number, maxPrecision = 16): number {
        let prevRoundedValue = roundFloat(value, 0);
        for (let precision = 1; precision <= maxPrecision; precision++) {
            const roundedValue = roundFloat(value, precision);
            if (isCloseEnough(roundedValue, prevRoundedValue)) {
                return precision;
            }
            prevRoundedValue = roundedValue;
        }
        return maxPrecision;
    }

    function deduceVersion(value: number): string {
        const significantDigits = adjustPrecision(value, 10);
        const roundedValue = roundFloat(value, significantDigits);
        return roundedValue.toFixed(significantDigits);
    }

    const discoveredVersion = deduceVersion(floatVersion);

    return Number(discoveredVersion);
}