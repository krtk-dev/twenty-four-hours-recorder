const UNIT = 1024

export default function (byte: number): string {

    const { floor, pow } = Math

    if (byte < pow(UNIT, 1)) {
        return `${floor(byte)}B`
    } else if (byte < pow(UNIT, 2)) {
        return `${floor(byte / UNIT)}KB`
    } else if (byte < pow(UNIT, 3)) {
        return `${floor(byte / pow(UNIT, 2))}MB`
    } else {
        return `${floor(byte / pow(UNIT, 3))}GB`
    }
}