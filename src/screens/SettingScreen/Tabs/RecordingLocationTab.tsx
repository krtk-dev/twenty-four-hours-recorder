import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'
import { DEFAULT_OPTION_BUTTON_HEIGHT } from '.'

const RecordingLocationTab = () => {

    const [location, setLocation] = useState('/storage/emulated/0/24HourRecoder')

    useEffect(() => {
        // location init
    }, [])

    return (
        <View >
            <Text style={styles.title} >Location of recording</Text>
            <BaseButton
                style={styles.optionButton}
                onPress={() => ToastAndroid.show(location, ToastAndroid.SHORT)}
            >
                <Text style={styles.option} >{location}</Text>
            </BaseButton>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 20
    },
    optionButton: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        width: '100%',
        height: 36
    },
    option: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.5
    }
})

export default RecordingLocationTab