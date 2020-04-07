declare module "react-native-background-audio-record" {
    export default class BackgroundAudioRecord {
        static startService: () => void;
        static stopService: () => void;
        static startRecording: () => void;
        static stopRecording: () => void;
        static saveRecording: () => void;
    }
}