import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { quility } from '../../../redux/Setting/types'
import { useSetting } from '../../../redux/Setting'
import { BaseButton } from 'react-native-gesture-handler'
import { DEFAULT_OPTION_BUTTON_HEIGHT } from '.'
const QualityOptions: quility[] = [
    { sampleRate: 8000, bit: 16, channer: 2 },
    { sampleRate: 16000, bit: 16, channer: 2 },
    { sampleRate: 22000, bit: 16, channer: 2 }
]

const QuilityTab = () => {

    const { setting, onChangeQuility } = useSetting()

    return (
        <View >
            <Text style={styles.title} >Quality</Text>
            {QualityOptions.map((item, index) =>
                <BaseButton

                    key={index}
                    style={styles.optionButton}
                    onPress={() => onChangeQuility(item)}
                >
                    <Text
                        style={{
                            ...styles.option,
                            opacity: setting.quility === item ? 1 : 0.5
                        }}
                    >
                        {Math.floor(item.sampleRate / 1000)}kHz, {item.bit}Bit, {item.channer === 1 ? 'Mono' : 'Stereo'}
                    </Text>
                </BaseButton>
            )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
        fontSize: 16,
        color: '#fff',
        marginLeft: 20
    },
    optionButton: {
        width: '100%',
        height: DEFAULT_OPTION_BUTTON_HEIGHT,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    option: {
        fontSize: 14,
        color: '#fff'
    }
})


export default QuilityTab
