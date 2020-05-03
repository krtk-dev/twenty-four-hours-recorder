import { SettingAction, SettingState } from '.'
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord'

const initialState: SettingState = {
    quility: { sampleRate: 16000, bit: 16, channer: 2 },
    dontShowAgain: false,
    pro: false,
    dontShowRate: false,
    saveCount: 0
};

function reducer(state: SettingState = initialState, action: SettingAction): SettingState {
    switch (action.type) {
        case 'setting/CHANGEQUILITY':
            // 해당 옵션으로 녹음 초기화
            BackgroundAudioRecord.stopService()
            BackgroundAudioRecord.startService()
            return { ...state, quility: action.quility }
        case 'setting/SETPRO':
            return { ...state, pro: action.pro }
        case 'setting/SETDONTSHOWAGAIN':
            return { ...state, dontShowAgain: true }
        case 'setting/SAVECOUNTPLUS':
            return { ...state, saveCount: state.saveCount + 1 }
        case 'setting/SETDONTSHOWRATE':
            return { ...state, dontShowRate: true }
        default:
            return state;
    }
}

export default reducer;