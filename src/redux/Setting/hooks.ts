import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
import { useCallback } from 'react';
import { changeQuility, setDontShowAgain, setPro, setDontShowRate, saveCountPlus } from '.';
import { quility } from './types';


export default function hook() {
    const setting = useSelector((state: RootState) => state.Setting);

    const dispatch = useDispatch();

    const onChangeQuility = useCallback((quility: quility) => dispatch(changeQuility(quility)), [dispatch]);
    const onSetPro = useCallback((pro: boolean) => dispatch(setPro(pro)), [dispatch])
    const onSetDontShowAgain = useCallback(() => dispatch(setDontShowAgain()), [dispatch])
    const onSetDontShowRate = useCallback(() => dispatch(setDontShowRate()), [dispatch])
    const onSaveCountPlus = useCallback(() => dispatch(saveCountPlus()), [dispatch])

    return {
        setting,
        onChangeQuility,
        onSetPro,
        onSetDontShowAgain,
        onSetDontShowRate,
        onSaveCountPlus
    };
}