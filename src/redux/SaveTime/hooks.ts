import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
import { useCallback } from 'react';
import { changeTimeIndex } from './index';
import { saveTimeOptionIndex } from './types';


export default function hook() {
    const saveTime = useSelector((state: RootState) => state.SaveTime);

    const dispatch = useDispatch();

    const onChangeTimeIndex = useCallback((index: saveTimeOptionIndex) => dispatch(changeTimeIndex(Math.round(index))), [dispatch]);

    return {
        saveTime,
        onChangeTimeIndex
    };
}