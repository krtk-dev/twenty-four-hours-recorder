import React, { useState, useEffect } from 'react'
import { StyleSheet, Animated, View, TouchableWithoutFeedback, Easing, Text } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows';
import { COLOR1, CLOCK_SIZE } from '../../components/style';
import Svg, { Line } from 'react-native-svg';
import { CLOCK_ANIMATION_DURATION } from '../../components/value';


const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export interface ClockProps {
    color: string;
    time: number;
    animation: Animated.Value
}

const Clock: React.FC<ClockProps> = ({ color, time, animation }) => {


    const [data, setData] = useState<number[]>([])



    const changeValue = (index: number) => {
        setTimeout(() => {
            const d = data.filter((_, i) => i == index ? Math.random() : _)
            setData(d)
            changeValue(index === 90 ? 0 : index + 1)
            console.log(index)
        }, 1000)
    }

    useEffect(() => {
        // BackgroundAudioRecord.startService()
        // BackgroundAudioRecord.stopService()
        const _data: number[] = []
        for (let i = 0; i < 180; i++) {
            _data.push(Math.random())
        }
        setData(_data)
        // changeValue(0)
        console.log(360 * CLOCK_ANIMATION_DURATION / time / 1000)
    }, [])

    return (
        <View style={{ width: CLOCK_SIZE, height: CLOCK_SIZE, alignItems: 'center', justifyContent: 'center' }} >
            <Neomorph
                useArt
                style={{
                    shadowRadius: 7,
                    borderRadius: 200,
                    width: CLOCK_SIZE,
                    height: CLOCK_SIZE,
                    backgroundColor: COLOR1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Neomorph
                    inner
                    useArt
                    style={{
                        shadowRadius: 7,
                        borderRadius: 200,
                        width: CLOCK_SIZE - 20,
                        height: CLOCK_SIZE - 20,
                        backgroundColor: color,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Neomorph
                        useArt
                        style={{
                            shadowRadius: 7,
                            borderRadius: 200,
                            width: CLOCK_SIZE - 100,
                            height: CLOCK_SIZE - 100,
                            backgroundColor: COLOR1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >

                        <Text style={{ color, fontSize: 14 }} >RECORDING</Text>
                        <View
                            style={{
                                position: 'absolute',
                                width: CLOCK_SIZE - 20,
                                height: CLOCK_SIZE - 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 200,
                            }} >
                            <AnimatedSvg
                                width={CLOCK_SIZE - 20}
                                height={CLOCK_SIZE - 20}
                                rotation={animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 360 * CLOCK_ANIMATION_DURATION / time / 1000]
                                })}

                            >
                                {data.map((value, index) => {
                                    const height = value * 14 + 1; //15=max min=1 heigth
                                    const v = ((CLOCK_SIZE - 60) / 2 - height / 2)
                                    return <Line
                                        key={index}
                                        x1={(CLOCK_SIZE - 20) / 2 + (Math.sin(Math.PI * 2 * index / data.length) * v)}
                                        y1={(CLOCK_SIZE - 20) / 2 - (Math.cos(Math.PI * 2 * index / data.length) * v)}
                                        x2={(CLOCK_SIZE - 20) / 2 + (Math.sin(Math.PI * 2 * index / data.length) * (v + height))}
                                        y2={(CLOCK_SIZE - 20) / 2 - (Math.cos(Math.PI * 2 * index / data.length) * (v + height))}
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
