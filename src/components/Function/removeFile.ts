import RNFS from 'react-native-fs'

export default async function (path: string): Promise<void> {
    await RNFS.unlink(path)
    return
}