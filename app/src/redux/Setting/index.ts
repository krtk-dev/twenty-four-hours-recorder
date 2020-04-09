import {
    quility
} from './types';


//액션 type 선언
export const CHANGEQUILITY = 'setting/CHANGEQUILITY' as const;

//액션 생성 함수 선언
export const changeQuility = (quility: quility) => ({ type: CHANGEQUILITY, quility });

//리듀서 type 지정
export type SettingAction =
    | ReturnType<typeof changeQuility>;


export type SettingState = {
    quility: quility
}


export { default as useSetting } from './hooks'
import reducer from './reducer'
export default reducer