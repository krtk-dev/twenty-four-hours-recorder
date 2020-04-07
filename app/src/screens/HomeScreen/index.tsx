import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import BackgroundAudioRecord from 'react-native-background-audio-record'

const HomeScreen = () => {

    useEffect(() => {
        // BackgroundAudioRecord.startService()
    }, [])
    return (
        <View>
            <Text>HOME</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeScreen
