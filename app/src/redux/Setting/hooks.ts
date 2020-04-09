import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
import { useCallback } from 'react';
import { changeQuility } from '.';
import { quility } from './types';


export default function hook() {
    const setting = useSelector((state: RootState) => state.Setting);

    const dispatch = useDispatch();

    const onChangeQuility = useCallback((quility: quility) => dispatch(changeQuility(quility)), [dispatch]);

    return {
        setting,
        onChangeQuility
    };
}