import { SaveTimeAction, SaveTimeState } from '.'

const initialState: SaveTimeState = {
    time: 30
};

function reducer(state: SaveTimeState = initialState, action: SaveTimeAction): SaveTimeState {
    switch (action.type) {
        case "savetime/CHANGETIME":
            return { ...state, time: action.time }
        default:
            return state;
    }
}

export default reducer;