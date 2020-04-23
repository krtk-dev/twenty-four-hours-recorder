import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WIDTH, COLOR1, CLOCK_COLORS } from '../../components/style'
import CircleButton from '../../components/Button/CircleButton'
import { useSaveTime } from '../../redux/SaveTime'

const DEFAULT_TEXT_COLOR = '#aaa'

const TimeSelector = () => {

    const { saveTime, onChangeTimeIndex } = useSaveTime()

    return (
        <View
            style={{
                width: WIDTH - 100,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <CircleButton
                onPress={() => onChangeTimeIndex(0)}
            >
                <Text style={{ color: saveTime.index === 0 ? CLOCK_COLORS[0] : DEFAULT_TEXT_COLOR }} >30s</Text>
            </CircleButton>
            <CircleButton
                onPress={() => onChangeTimeIndex(1)}
                style={{ marginRight: 6, marginTop: 44 }}
            >
                <Text style={{ color: saveTime.index === 1 ? CLOCK_COLORS[1] : DEFAULT_TEXT_COLOR }} >5m</Text>
            </CircleButton>
            <CircleButton
                onPress={() => onChangeTimeIndex(2)}
                style={{ marginLeft: 6, marginTop: 44 }}
            >
                <Text style={{ color: saveTime.index === 2 ? CLOCK_COLORS[2] : DEFAULT_TEXT_COLOR }} >15m</Text>
            </CircleButton>
            <CircleButton
                onPress={() => onChangeTimeIndex(3)}
            >
                <Text style={{ color: saveTime.index === 3 ? CLOCK_COLORS[3] : DEFAULT_TEXT_COLOR }} >30m</Text>
            </CircleButton>

        </View>
    )
}

export default TimeSelector