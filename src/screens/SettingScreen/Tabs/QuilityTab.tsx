import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { quility } from '../../../redux/Setting/types'
import { useSetting } from '../../../redux/Setting'
import { BaseButton } from 'react-native-gesture-handler'
import Dialog from 'react-native-dialog'
import { COLOR2, COLOR1 } from '../../../components/style'

const QualityOptions: quility[] = [
    { sampleRate: 8000, bit: 16, channer: 2 },
    { sampleRate: 16000, bit: 16, channer: 2 },
    { sampleRate: 22000, bit: 16, channer: 2 }
]

const QuilityTab = () => {

    const { setting, onChangeQuility } = useSetting()

    const [alert, setAlert] = useState(false)
    const [targetQuilityIndex, setTargetQuilityIndex] = useState<number>(-1)

    const onShowAlert = (index: number) => {
        setTargetQuilityIndex(index)
        setAlert(true)
    }

    const onQuility = () => {
        onChangeQuility(QualityOptions[targetQuilityIndex])
        setAlert(false)
    }

    return (
        <View >
            <Text style={styles.title} >Quality</Text>
            {QualityOptions.map((item, index) =>
                <BaseButton
                    key={index}
                    style={styles.optionButton}
                    onPress={() => onShowAlert(index)}
                >
                    <Text
                        style={{
                            ...styles.option,
                            opacity: setting.quility.sampleRate === item.sampleRate ? 1 : 0.5
                        }}
                    >
                        {Math.floor(item.sampleRate / 1000)}kHz, {item.bit}Bit, {item.channer === 1 ? 'Mono' : 'Stereo'}
                    </Text>
                </BaseButton>
            )
            }
            <Dialog.Container
                visible={alert}
                contentStyle={{ backgroundColor: COLOR1, elevation: 0 }}
                onBackButtonPress={() => setAlert(false)}
                onBackdropPress={() => setAlert(false)}

            >
                <Dialog.Title style={{ color: '#fff' }} >Change quility</Dialog.Title>
                <Dialog.Description style={{ color: '#fff' }} >Recording will reset</Dialog.Description>
                <Dialog.Button style={{ color: '#fff' }} onPress={() => setAlert(false)} label="CANCEL" />
                <Dialog.Button style={{ color: COLOR2 }} onPress={onQuility} label="CHANGE" />
            </Dialog.Container>
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
        height: 36,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    option: {
        fontSize: 14,
        color: '#fff'
    }
})


export default QuilityTab
