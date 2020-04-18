import React from 'react'
import { StyleSheet, View } from 'react-native'
import DefaultHeader from '../../components/Header/DefaultHeader'
import Body from './Body'


const RecordHistoryScreen = () => {
    return (
        <View>
            <DefaultHeader
                title='RECORDINGS'
            />
            <Body />
        </View>
    )
}

export default RecordHistoryScreen

const styles = StyleSheet.create({})
