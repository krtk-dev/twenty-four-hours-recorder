import React, { useState, useEffect } from 'react'
import { StyleSheet, Animated, View, TouchableWithoutFeedback, Easing, Text } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows';
import { COLOR1, WIDTH, COLOR2 } from '../../components/style';
import CircleButton from '../../components/Button/CircleButton';
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord'
import moment from 'moment';

import Svg, { Line } from 'react-native-svg';


const AnimatedSvg = Animated.createAnimatedComponent(Svg)

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
                duration: 6 * 1000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ]).start(() => runAnimation())
    }

    const changeValue = (index: number) => {
        setTimeout(() => {
            const d = data.filter((_, i) => i == index ? Math.random() : _)
            setData(d)
            changeValue(index === 90 ? 0 : index + 1)
            console.log(index)
        }, 1000)
    }

    useEffect(() => {
        runAnimation()
        // BackgroundAudioRecord.startService()
        // BackgroundAudioRecord.stopService()
        const _data: number[] = []
        for (let i = 0; i < 180; i++) {
            _data.push(Math.random())
        }
        setData(_data)
        // changeValue(0)
    }, [])

    return (
        <View style={{ width: CLOCK_WIDTH, height: CLOCK_WIDTH, alignItems: 'center', justifyContent: 'center' }} >
            <Neomorph
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
                <Neomorph
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
                    <Neomorph
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
                        <View
                            style={{
                                position: 'absolute',
                                width: CLOCK_WIDTH - 20,
                                height: CLOCK_WIDTH - 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 200,
                            }} >
                            <AnimatedSvg
                                width={CLOCK_WIDTH - 20}
                                height={CLOCK_WIDTH - 20}
                                rotation={animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 360]
                                })}

                            >
                                {data.map((value, index) => {
                                    const height = value * 14 + 1; //15=max min=1 heigth
                                    const v = ((CLOCK_WIDTH - 60) / 2 - height / 2)
                                    return <Line
                                        key={index}
                                        x1={(CLOCK_WIDTH - 20) / 2 + (Math.sin(Math.PI * 2 * index / data.length) * v)}
                                        y1={(CLOCK_WIDTH - 20) / 2 - (Math.cos(Math.PI * 2 * index / data.length) * v)}
                                        x2={(CLOCK_WIDTH - 20) / 2 + (Math.sin(Math.PI * 2 * index / data.length) * (v + height))}
                                        y2={(CLOCK_WIDTH - 20) / 2 - (Math.cos(Math.PI * 2 * index / data.length) * (v + height))}
                                        stroke="#fff"
                                        strokeWidth="1"
                                    />
                                })}
                            </AnimatedSvg>
                        </View>
                    </Neomorph>
                </Neomorph>
            </Neomorph>
        </View>
    )
}

export default Clock

const styles = StyleSheet.create({})
