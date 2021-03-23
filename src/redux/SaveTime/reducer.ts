import { SaveTimeAction, SaveTimeState } from '.'

const initialState: SaveTimeState = {
    index: 0
};

function reducer(state: SaveTimeState = initialState, action: SaveTimeAction): SaveTimeState {
    switch (action.type) {
        case "savetime/CHANGETIMEINDEX":
            return { ...state, index: action.index }
        default:
            return state;
    }
}

export default reducer;