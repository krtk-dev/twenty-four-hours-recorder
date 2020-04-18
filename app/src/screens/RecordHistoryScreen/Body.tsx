import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import RecordingsCrad from '../../components/Card/RecordingsCrad'

const data = [
    {
        name: "Recording 1",
        date: "2019-04-14 04:15",
        audioLength: "00:30"
    },
    {
        name: "Recording 1",
        date: "2019-04-14 04:15",
        audioLength: "00:30"
    },
    {
        name: "Recording 1",
        date: "2019-04-14 04:15",
        audioLength: "00:30"
    },
    {
        name: "Recording 1",
        date: "2019-04-14 04:15",
        audioLength: "00:30"
    }
]

const Body = () => {
    return (
        <FlatList
            overScrollMode="never"
            data={data}
            renderItem={({ item }) => <RecordingsCrad
                {...item}
            />}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

export default Body

const styles = StyleSheet.create({})
