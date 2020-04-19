import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, NativeModules, Alert } from 'react-native'
import RecordingsCrad from '../../components/Card/RecordingsCrad'
import RNFS from 'react-native-fs'
import moment from 'moment'
import removeFile from '../../components/Function/removeFile'
import getWavDuration from '../../components/Function/getWavDuration'

interface data {
    name: string;
    date: string;
    audioDuration: number;
    path: string;
}

const Body = () => {

    const [data, setData] = useState<data[]>([])
    const [playIndex, setPlayIndex] = useState(-1)

    const getFile = async () => {
        const files = await RNFS.readDir('/storage/emulated/0/24hourRecord')
        const ls: data[] = []
        for (const i in files) {
            if (files[i].name.includes(".wav")) {
                ls.push({
                    name: files[i].name.split('.')[0],
                    audioDuration: await getWavDuration(files[i].path),
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

    const onDelteFile = async (path: string) => {
        try {
            await removeFile(path)
            setData(data.filter((value) => value.path !== path))
            setPlayIndex(-1)
        } catch (error) {
            Alert.alert("Delete error")
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
                onDeleteFile={onDelteFile}
            />}
            keyExtractor={(_, index) => index.toString()}
        />
    )
}

export default Body

const styles = StyleSheet.create({})
