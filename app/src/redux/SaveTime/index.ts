import { saveTimeOption } from './types';


export const CHANGETIME = 'savetime/CHANGETIME' as const;

export const changeTime = (time: saveTimeOption) => ({ type: CHANGETIME, time });

export type SaveTimeAction =
    | ReturnType<typeof changeTime>;


export type SaveTimeState = {
    time: saveTimeOption
}


export { default as useSaveTime } from './hooks'
import reducer from './reducer'
export default reducer


export const time2Index = (time: saveTimeOption) => {
    switch (time) {
        case 30: return 0
        case 300: return 1
        case 900: return 2
        case 1800: return 3
    }
}