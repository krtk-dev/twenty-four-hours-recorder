import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows'
import { WIDTH, COLOR1 } from '../style'

interface RecordingsCradProps {
    name: string;
    date: string;
    audioLength: string;

}

const RecordingsCrad: React.FC<RecordingsCradProps> = (props) => {
    return (
        <NeomorphBox
            inner
            style={{
                height: 70,
                width: WIDTH - 20,
                shadowRadius: 0,
                borderRadius: 20,
                backgroundColor: COLOR1,
                alignSelf: 'center',
            }}
        >
            <View style={styles.infoContainer} >
                <View>
                    <Text style={styles.name} >{props.name}</Text>
                    <Text style={styles.date} >{props.date}</Text>
                </View>
                <Text style={styles.audioLength} >{props.audioLength}</Text>
            </View>
        </NeomorphBox>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        height: 70,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        color: '#fff',
        marginBottom: 4
    },
    date: {
        color: '#fff',
        opacity: 0.5,
        fontSize: 12
    },
    audioLength: {
        color: '#fff',
    }
})

export default RecordingsCrad