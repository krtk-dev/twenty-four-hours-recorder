import RNFS from 'react-native-fs'
import { Buffer } from 'buffer'

export interface AudioInfo {
    duration: number;
    sampleRate: number;
    numChannel: number;
    bitPerSample: number;
    size: number;
}

export default async function (path: string): Promise<AudioInfo> {
    let buffer: any = new Buffer(40);
    const result = await RNFS.read(path, 40, 0, 'ascii')

    buffer = Buffer.from(result, 'ascii').toString('hex').match(/.{1,2}/g);
    const chunk_size = parseInt(buffer.slice(4, 8).reverse().join(""), 16);
    const sampleRate = parseInt(buffer.slice(24, 28).reverse().join(""), 16);
    const numChannel = parseInt(buffer.slice(22, 24).reverse().join(""), 16);
    const bitPerSample = parseInt(buffer.slice(34, 36).reverse().join(""), 16);
    const duration = chunk_size / (sampleRate * numChannel * (bitPerSample / 8));
    return {
        duration,
        sampleRate,
        numChannel,
        bitPerSample,
        size: chunk_size + 40
    }
}