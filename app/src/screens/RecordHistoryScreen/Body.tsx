import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, NativeModules } from 'react-native'
import RecordingsCrad from '../../components/Card/RecordingsCrad'
import RNFS from 'react-native-fs'
import moment from 'moment'

interface data {
    name: string;
    date: string;
    audioLength: string;
    path: string;
}

const Body = () => {

    const [data, setData] = useState<data[]>([])
    const [playIndex, setPlayIndex] = useState(-1)

    const getFile = async () => {
        const files = await RNFS.readDir('/storage/emulated/0/24hourRecord')
        const ls: data[] = []
        for (const i in files) {
            if (!files[i].name.includes(".pcm")) {
                ls.push({
                    name: files[i].name.split('.')[0],
                    audioLength: files[i].size,
                    date: moment(files[i].ctime?.getDate()).format('YYYY-MM-DD hh:mm'),
                    path: files[i].path
                })
            }
        }
        setData(ls)
    }

    useEffect(() => {
        getFile()
    }, [])

    const onRecordingCardClick = (name: string) => {
        for (const i in data) {
            if (data[i].name === name) {
                setPlayIndex(parseInt(i))
                return
            }
        }
    }

    return (
        <FlatList
            overScrollMode="never"
            data={data}
            renderItem={({ item, index }) => <RecordingsCrad
                {...item}
                onPress={onRecordingCardClick}
                detail={index == playIndex}
            />}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

export default Body

const styles = StyleSheet.create({})
