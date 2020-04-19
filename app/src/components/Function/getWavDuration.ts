import RNFS from 'react-native-fs'
import { Buffer } from 'buffer'

export default async function (path: string): Promise<number> {
    let buffer: any = new Buffer(40);
    const result = await RNFS.read(path, 40, 0, 'ascii')

    buffer = Buffer.from(result, 'ascii').toString('hex').match(/.{1,2}/g);
    const chunk_size = parseInt(buffer.slice(4, 8).reverse().join(""), 16);
    const sample_rate = parseInt(buffer.slice(24, 28).reverse().join(""), 16);
    const num_channel = parseInt(buffer.slice(22, 24).reverse().join(""), 16);
    const bit_per_sample = parseInt(buffer.slice(34, 36).reverse().join(""), 16);
    const duration = chunk_size / (sample_rate * num_channel * (bit_per_sample / 8));
    return duration
}