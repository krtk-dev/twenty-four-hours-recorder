import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
import { useCallback } from 'react';
import { changeTime } from '.';
import { saveTimeOption } from './types';


export default function hook() {
    const saveTime = useSelector((state: RootState) => state.SaveTime);

    const dispatch = useDispatch();

    const onChangeTime = useCallback((time: saveTimeOption) => dispatch(changeTime(time)), [dispatch]);

    return {
        saveTime,
        onChangeTime
    };
}