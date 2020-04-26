import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { quility } from '../../../redux/Setting/types'
import { useSetting } from '../../../redux/Setting'
import { BaseButton } from 'react-native-gesture-handler'

const QualityOptions: quility[] = [
    { sampleRate: 8000, bit: 16, channer: 2 },
    { sampleRate: 16000, bit: 16, channer: 2 },
    { sampleRate: 22000, bit: 16, channer: 2 }
]

const QuilityTab = () => {

    const { setting, onChangeQuility } = useSetting()

    const onQuility = () => {

    }

    return (
        <View >
            <Text style={styles.title} >Quality</Text>
            {QualityOptions.map((item, index) =>
                <BaseButton

                    key={index}
                    style={styles.optionButton}
                    onPress={onQuility}
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
                visible={deleteDialog}
                contentStyle={{ backgroundColor: COLOR1, elevation: 0 }}
                onBackButtonPress={() => setDeleteDialog(false)}
                onBackdropPress={() => setDeleteDialog(false)}

            >
                <Dialog.Title style={{ color: '#fff' }} >Recording delete</Dialog.Title>
                <Dialog.Description style={{ color: '#fff' }} >
                    Do you want to delete this recording? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button style={{ color: '#fff' }} onPress={() => setDeleteDialog(false)} label="Cancel" />
                <Dialog.Button style={{ color: COLOR2 }} onPress={onDelete} label="Delete" />
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
