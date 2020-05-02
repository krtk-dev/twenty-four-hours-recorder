import { saveTimeOption, saveTimeOptionIndex } from './types';


export const CHANGETIMEINDEX = 'savetime/CHANGETIMEINDEX' as const;

export const changeTimeIndex = (index: saveTimeOptionIndex) => ({ type: CHANGETIMEINDEX, index });

export type SaveTimeAction =
    | ReturnType<typeof changeTimeIndex>;


export type SaveTimeState = {
    index: saveTimeOptionIndex
}


export { default as useSaveTime } from './hooks'
import reducer from './reducer'
export default reducer


export const index2Time = (index: saveTimeOptionIndex): saveTimeOption => {
    switch (index) {
        case 0: return 30
        case 1: return 300
        case 2: return 900
        case 3: return 1800
        default: return 30
    }
}