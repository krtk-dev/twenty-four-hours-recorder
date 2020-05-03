import { quility } from './types';


export const CHANGEQUILITY = 'setting/CHANGEQUILITY' as const;
export const SETPRO = 'setting/SETPRO' as const;
export const SETDONTSHOWAGAIN = 'setting/SETDONTSHOWAGAIN' as const;
export const SAVECOUNTPLUS = 'setting/SAVECOUNTPLUS' as const;
export const SETDONTSHOWRATE = 'setting/SETDONTSHOWRATE' as const;

export const changeQuility = (quility: quility) => ({ type: CHANGEQUILITY, quility });
export const setPro = (pro: boolean) => ({ type: SETPRO, pro })
export const setDontShowAgain = () => ({ type: SETDONTSHOWAGAIN })
export const saveCountPlus = () => ({ type: SAVECOUNTPLUS })
export const setDontShowRate = () => ({ type: SETDONTSHOWRATE })

export type SettingAction =
    | ReturnType<typeof changeQuility>
    | ReturnType<typeof setPro>
    | ReturnType<typeof setDontShowAgain>
    | ReturnType<typeof saveCountPlus>
    | ReturnType<typeof setDontShowRate>;


export type SettingState = {
    quility: quility,
    pro: boolean,
    dontShowAgain: boolean,
    dontShowRate: boolean,
    saveCount: number
}


export { default as useSetting } from './hooks'
import reducer from './reducer'
export default reducer