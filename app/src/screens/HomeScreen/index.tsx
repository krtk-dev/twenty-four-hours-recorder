import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord'

const HomeScreen = () => {

    useEffect(() => {
        console.log("load")
        BackgroundAudioRecord.startService()
    }, [])
    return (
        <View>
            <Text>HOME</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeScreen
