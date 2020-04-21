import { quility } from './types';


export const CHANGEQUILITY = 'setting/CHANGEQUILITY' as const;

export const changeQuility = (quility: quility) => ({ type: CHANGEQUILITY, quility });

export type SettingAction =
    | ReturnType<typeof changeQuility>;


export type SettingState = {
    quility: quility
}


export { default as useSetting } from './hooks'
import reducer from './reducer'
export default reducer