import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, NativeModules } from 'react-native'
import RecordingsCrad from '../../components/Card/RecordingsCrad'
import RNFS from 'react-native-fs'
import moment from 'moment'

interface data {
    name: string;
    date: string;
    audioLength: string;
}

const Body = () => {

    const [data, setData] = useState<data[]>([])

    const getFile = async () => {
        const files = await RNFS.readDir('/storage/emulated/0/24hourRecord')
        const ls: data[] = []
        console.log(files[0])
        for (const i in files) {
            if (files[i].name.includes(".wav")) {
                ls.push({
                    name: files[i].name.split('.')[0],
                    audioLength: '00:30',
                    date: moment(files[i].ctime?.getDate()).format('YYYY-MM-DD hh:mm')
                })
            }
        }
        setData(ls)

    }

    useEffect(() => {
        getFile()
    }, [])

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
