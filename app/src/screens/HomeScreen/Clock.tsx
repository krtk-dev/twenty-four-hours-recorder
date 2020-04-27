import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, Animated, View, TouchableWithoutFeedback, Easing, Text, ToastAndroid } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows';
import { COLOR1, CLOCK_SIZE, COLOR2 } from '../../components/style';
import Svg, { Line } from 'react-native-svg';
import { CLOCK_ANIMATION_DURATION } from '../../components/value';
import SaveIcon from '../../components/Svg/SaveIcon'
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord';
import moment from 'moment';
import Dialog from 'react-native-dialog';
import { useSetting } from '../../redux/Setting';

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export interface ClockProps {
    color: string;
    time: number;
    animation: Animated.Value
}

const Clock: React.FC<ClockProps> = ({ color, time, animation }) => {

    const { setting, onSetDontShowAgain } = useSetting()

    const [data, setData] = useState<number[]>([])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        BackgroundAudioRecord.startService()
        const _data: number[] = []
        for (let i = 0; i < 180; i++) {
            _data.push(Math.random())
        }
        setData(_data)
    }, [])

    const onSavePress = () => {
        if (time > 30 && !setting.dontShowAgain) {
            setAlert(true)
        } else {
            onSave()
        }
    }

    const onSave = async () => {
        setAlert(false)
        if (time > 30) {
            onSetDontShowAgain() //다음부터 alert보지 않기
            //광고 시청 하기 추가
            saveProcess()
        } else {
            saveProcess()
        }
    }
    const saveProcess = () => {
        BackgroundAudioRecord.saveRecording(time, "Recording-" + moment().format("MMDDhmmss"), (state: string) => {
            if (state === 'success') ToastAndroid.show('Save success', ToastAndroid.SHORT)
            else ToastAndroid.show('Fail', ToastAndroid.SHORT)
        })
    }

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
                    <TouchableWithoutFeedback onPress={onSavePress}>
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

                            <SaveIcon />
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
                    </TouchableWithoutFeedback>
                </Neomorph>
            </Neomorph>
            <Dialog.Container
                visible={alert}
                contentStyle={{ backgroundColor: COLOR1, elevation: 0 }}
                onBackButtonPress={() => setAlert(false)}
                onBackdropPress={() => setAlert(false)}

            >
                <Dialog.Title style={{ color: '#fff' }} >{`Save last ${time / 60} min`}</Dialog.Title>
                <Dialog.Description style={{ color: '#fff' }} >Advertisements will be launched</Dialog.Description>
                <Dialog.Description style={{ color: '#777', fontSize: 12 }} >This alert don't show in next time</Dialog.Description>
                <Dialog.Button style={{ color: '#fff' }} onPress={() => setAlert(false)} label="CANCEL" />
                <Dialog.Button style={{ color: COLOR2 }} onPress={onSave} label="SAVE" />
            </Dialog.Container>
        </View>
    )
}

const styles = StyleSheet.create({})

const ClockMemo = React.memo(Clock)
export default ClockMemo