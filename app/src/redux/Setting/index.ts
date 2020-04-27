import { quility } from './types';


export const CHANGEQUILITY = 'setting/CHANGEQUILITY' as const;
export const SETPRO = 'setting/SETPRO' as const;
export const SETDONTSHOWAGAIN = 'setting/SETDONTSHOWAGAIN' as const;

export const changeQuility = (quility: quility) => ({ type: CHANGEQUILITY, quility });
export const setPro = (pro: boolean) => ({ type: SETPRO, pro })
export const setDontShowAgain = () => ({ type: SETDONTSHOWAGAIN })

export type SettingAction =
    | ReturnType<typeof changeQuility>
    | ReturnType<typeof setPro>
    | ReturnType<typeof setDontShowAgain>;


export type SettingState = {
    quility: quility,
    pro: boolean,
    dontShowAgain: boolean
}


export { default as useSetting } from './hooks'
import reducer from './reducer'
export default reducer