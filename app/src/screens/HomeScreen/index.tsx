import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord'

const HomeScreen = () => {

    const [a, setA] = useState(1)

    useEffect(() => {
        console.log("load")
        BackgroundAudioRecord.startService()
        setTimeout(() => {
            BackgroundAudioRecord.stopService()
        }, 1000);
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 200, }} >
            <TouchableWithoutFeedback
                onPress={() => {
                    try {
                        BackgroundAudioRecord.saveRecording(300, "Recording-" + Date.now())
                    } catch (error) {

                    }
                }}
            >
                <Text>5분 저장 Save Recording</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => {
                    BackgroundAudioRecord.saveRecording(900, "Recording-" + Date.now())
                }}
            >
                <Text>15분 저장 Save Recording</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => {
                    BackgroundAudioRecord.saveRecording(1800, "Recording-" + Date.now())
                }}
            >
                <Text>30분 저장 Save Recording</Text>
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeScreen
