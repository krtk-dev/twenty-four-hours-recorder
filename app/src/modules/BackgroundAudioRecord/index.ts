import { NativeModules } from 'react-native';

interface BackgroundAudioRecord {
    startService: () => void;
    stopService: () => void;
    saveRecording: (time: number, name: string) => void;
}

const BackgroundAudioRecord: BackgroundAudioRecord = NativeModules.BackgroundAudioRecord;

export default BackgroundAudioRecord;