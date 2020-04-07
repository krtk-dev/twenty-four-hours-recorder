import { NativeModules } from 'react-native';

interface BackgroundAudioRecord {
    startService: () => void;
    stopService: () => void;
    startRecording: () => void;
    stopRecording: () => void;
    saveRecording: () => void;
}

const BackgroundAudioRecord: BackgroundAudioRecord = NativeModules.BackgroundAudioRecord;

export default BackgroundAudioRecord;