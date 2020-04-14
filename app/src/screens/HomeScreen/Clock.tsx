import React, { useState, useEffect } from 'react'
import { StyleSheet, Animated, View, TouchableWithoutFeedback, Easing, Text } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { COLOR1, WIDTH, COLOR2 } from '../../components/style';
import CircleButton from '../../components/Button/CircleButton';
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord'
import moment from 'moment';

const AnimatedNeomorphBox = Animated.createAnimatedComponent(NeomorphBox)

const CLOCK_WIDTH = 200
const SAVE_BUTTON_DURATION = 144
const SAVE_BUTTON_SIZE = 50

const Clock = () => {

    const [animation] = useState(new Animated.Value(0))
    const [data, setData] = useState<number[]>([])

    const [isRecording, setIsRecording] = useState(false)

    const runAnimation = () => {
        animation.setValue(0)
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: 1800 * 1000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ]).start(() => runAnimation())
    }

    useEffect(() => {
        runAnimation()
        // BackgroundAudioRecord.startService()
        // BackgroundAudioRecord.stopService()
        const _data: number[] = []
        for (let i = 0; i < 90; i++) {
            _data.push(i)
        }
        setData(_data)
    }, [])

    return (
        <View style={{ width: CLOCK_WIDTH, height: CLOCK_WIDTH, alignItems: 'center', justifyContent: 'center' }} >
            <CircleButton style={{
                position: 'absolute',
                translateY: -SAVE_BUTTON_DURATION
            }}
                onPress={() => {
                    console.log(1)
                    BackgroundAudioRecord.saveRecording(1800, "Recording-" + moment().format("YYYY-MM-DD-h:mm:ss"), () => console.log("SUCCESS"))
                }}
            >
                <Text style={{ color: COLOR2, fontSize: 16 }} >30</Text>
            </CircleButton>
            <CircleButton style={{
                position: 'absolute',
                translateY: SAVE_BUTTON_DURATION
            }}
                onPress={() => {
                    console.log(1)
                    BackgroundAudioRecord.saveRecording(900, "Recording-" + moment().format("YYYY-MM-DD-h:mm:ss"), () => console.log("SUCCESS"))
                }}
            >
                <Text style={{ color: COLOR2, fontSize: 16 }} >15</Text>
            </CircleButton>
            <CircleButton
                style={{
                    position: 'absolute',
                    translateX: Math.sin(Math.PI / 3) * SAVE_BUTTON_DURATION,
                    translateY: -Math.cos(Math.PI / 3) * SAVE_BUTTON_DURATION
                }}
                onPress={() => {
                    console.log(1)
                    BackgroundAudioRecord.saveRecording(300, "Recording-" + moment().format("YYYY-MM-DD-h:mm:ss"), () => console.log("SUCCESS"))
                }}
            >
                <Text style={{ color: COLOR2, fontSize: 16 }} >5</Text>
            </CircleButton>
            <NeomorphBox
                style={{
                    shadowRadius: 7,
                    borderRadius: 200,
                    width: CLOCK_WIDTH,
                    height: CLOCK_WIDTH,
                    backgroundColor: COLOR1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <NeomorphBox
                    inner
                    style={{
                        shadowRadius: 7,
                        borderRadius: 200,
                        width: CLOCK_WIDTH - 20,
                        height: CLOCK_WIDTH - 20,
                        backgroundColor: COLOR2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <NeomorphBox
                        style={{
                            shadowRadius: 7,
                            borderRadius: 200,
                            width: CLOCK_WIDTH - 100,
                            height: CLOCK_WIDTH - 100,
                            backgroundColor: COLOR1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >

                        <Text style={{ color: COLOR2, fontSize: 14 }} >RECORDING</Text>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                width: CLOCK_WIDTH - 20,
                                height: CLOCK_WIDTH - 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 200,
                                transform: [{
                                    rotate: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }]
                            }} >
                            {data.map((value, index) => {
                                const height = value / 180 * 14 + 1
                                return <View
                                    key={index}
                                    style={{
                                        width: 1,
                                        height,
                                        backgroundColor: '#fff',
                                        position: 'absolute',
                                        translateX: Math.sin(Math.PI * 2 * index / data.length) * ((CLOCK_WIDTH - 60) / 2 - height / 2),
                                        translateY: -Math.cos(Math.PI * 2 * index / data.length) * ((CLOCK_WIDTH - 60) / 2 - height / 2),
                                        transform: [{ rotate: (360 * index / data.length).toString() + "deg" }]
                                    }}
                                />
                            }
                            )}
                        </Animated.View>
                    </NeomorphBox>
                </NeomorphBox>
            </NeomorphBox>
        </View>
    )
}

export default Clock

const styles = StyleSheet.create({})
