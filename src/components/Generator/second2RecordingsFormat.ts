export default function (playSec: number): string {
    const min = Math.floor(playSec / 60)
    const sec = Math.floor(playSec % 60)
    const minStr = min >= 10 ? min : "0" + min
    const secStr = sec >= 10 ? sec : "0" + sec
    return minStr + ":" + secStr
}