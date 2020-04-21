import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'
import { WIDTH, COLOR1, CLOCK_SIZE, COLOR2 } from '../../components/style'
import CircleButton from '../../components/Button/CircleButton'
import { useSaveTime } from '../../redux/SaveTime'

const TimeSelector = () => {

    const { saveTime, onChangeTime } = useSaveTime()

    return (
        <Neomorph
            useArt
            inner
            style={{
                shadowRadius: 0,
                borderRadius: 20,
                height: 90,
                width: WIDTH - 40,
                backgroundColor: COLOR1,
                marginTop: 30,
                // position: 'absolute',
                // transform: [{ translateY: CLOCK_SIZE / 2 + 70 }],
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <CircleButton
                onPress={() => onChangeTime(30)}

            >
                <Text style={{ color: COLOR2 }} >30s</Text>
            </CircleButton>
            <CircleButton
                onPress={() => onChangeTime(300)}
            >
                <Text style={{ color: COLOR2 }} >5m</Text>
            </CircleButton>
            <CircleButton
                onPress={() => onChangeTime(300)}
            >
                <Text style={{ color: COLOR2 }} >15m</Text>
            </CircleButton>
            <CircleButton
                onPress={() => onChangeTime(300)}
            >
                <Text style={{ color: COLOR2 }} >30m</Text>
            </CircleButton>

        </Neomorph>
    )
}

const styles = StyleSheet.create({

})

export default TimeSelector