import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, NativeModules, Alert } from 'react-native'
import RecordingsCrad from '../../components/Card/RecordingsCrad'
import RNFS from 'react-native-fs'
import moment from 'moment'
import removeFile from '../../components/Function/removeFile'
import getWavInfo, { AudioInfo } from '../../components/Function/getWavInfo'

export interface AudioData {
    name: string;
    date: string;
    path: string;
    audioInfo: AudioInfo
}

const Body = () => {

    const [data, setData] = useState<AudioData[]>([])
    const [playIndex, setPlayIndex] = useState(-1)

    const getFile = async () => {
        const files = await RNFS.readDir('/storage/emulated/0/24hourRecord')
        const ls: AudioData[] = []
        for (const i in files) {
            if (files[i].name.includes(".wav")) {
                const info = await getWavInfo(files[i].path)
                ls.push({
                    name: files[i].name.split('.')[0],
                    date: moment(files[i].mtime as Date).format('YYYY-MM-DD hh:mm'),
                    path: files[i].path,
                    audioInfo: info
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
