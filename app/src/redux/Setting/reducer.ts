import { SettingAction, SettingState } from '.'

const initialState: SettingState = {
    quility: { sampleRate: 16000, bit: 16, channer: 2 }
};

function reducer(state: SettingState = initialState, action: SettingAction): SettingState {
    switch (action.type) {
        case 'setting/CHANGEQUILITY':
            return { ...state, quility: action.quility }
        default:
            return state;
    }
}

export default reducer;