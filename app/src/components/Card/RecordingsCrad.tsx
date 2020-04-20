import React, { useEffect, useState, useMemo, useRef } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'
import { WIDTH, COLOR1, COLOR2 } from '../style'
import PlayIcon from '../Svg/PlayIcon'
import MenuIcon from '../Svg/MenuIcon'
import PauseIcon from '../Svg/PauseIcon'
import Sound from 'react-native-sound'
import Slider from '@react-native-community/slider';
import second2RecordingsFormat from '../Generator/second2RecordingsFormat'
import Menu, { MenuItem } from 'react-native-material-menu';
import Dialog from "react-native-dialog";
import Share from 'react-native-share'
import { AudioData } from '../../screens/RecordHistoryScreen/Body'
import byteFormat from '../Generator/byteFormat'

const AnimatedNeomorph = Animated.createAnimatedComponent(Neomorph)
const ANIMATION_DURATION = 240

interface RecordingsCradProps {
    detail: boolean;
    onPress: (name: string) => void;
    onDeleteFile: (path: string) => Promise<void>;
}

const RecordingsCrad: React.FC<RecordingsCradProps & AudioData> = ({ audioInfo, ...props }) => {

    const sound = useRef<Sound>()
    const [duration, setDuration] = useState(0)
    const [playState, setPlayState] = useState<"playing" | "paused">("paused")
    const [playSeconds, setPlaySeconds] = useState(0)

    const [animation] = useState(new Animated.Value(0))
    const [detailUiOn, setDetailUiOn] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [detailDialog, setDetailDialog] = useState(false)

    const menuRef = useRef<Menu>(null)

    useEffect(() => {
        const timeout = setInterval(() => { //100ms 마다 시간 조회
            if (sound.current && sound.current.isLoaded()) {
                sound.current.getCurrentTime((seconds, isPlaying) => {
                    setPlaySeconds(seconds)
                })
            }
        }, 100);

        return () => {
            clearInterval(timeout)
            onSoundRelease() // 언마운트 시에 사운드 해제
        }
    }, [])

    useEffect(() => {
        if (props.detail) { // open animation
            Animated.timing(animation, {
                toValue: 1,
                useNativeDriver: false,
                duration: ANIMATION_DURATION,
                easing: Easing.linear
            }).start()
            setDetailUiOn(true)
            onPlay()
        } else { //close animation
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: false,
                duration: ANIMATION_DURATION,
                easing: Easing.linear
            }).start(() => setDetailUiOn(false))
            onSoundRelease() //소리 끄기
        }
    }, [props.detail])



    const onSoundRelease = () => {
        try {
            sound.current?.stop()
            sound.current?.release()
            sound.current = undefined
            setDuration(0)
            setPlayState("paused")
            setPlaySeconds(0)
        } catch (error) {
            console.log(error)
        }
    }

    const onPlay = async () => {
        if (playState == "playing") return

        if (sound.current) {
            sound.current.play()
            setPlayState("playing")
        } else {
            sound.current = new Sound(props.path, '', (error) => {
                if (sound.current && sound.current.isLoaded()) {
                    sound.current.setVolume(1);
                    sound.current.play()
                    setDuration(sound.current.getDuration())
                    setPlayState("playing")
                }
            })
        }
    }

    const onPause = () => {
        if (sound.current && playState === "playing") {
            sound.current.pause()
            setPlayState("paused")
        }
    }

    const onSliderEditing = (value: number) => {
        if (sound.current) {
            sound.current.setCurrentTime(value)
            setPlaySeconds(value)
        }
    }

    const onShare = () => {
        menuRef.current && menuRef.current.hide()
        Share.open({
            url: `file://${props.path}`
        })
    }

    const onRename = () => {
        menuRef.current && menuRef.current.hide()
    }

    const onDelete = async () => {
        menuRef.current && menuRef.current.hide()
        setDeleteDialog(false)
        props.onDeleteFile(props.path)
    }

    const onDetail = () => {
        menuRef.current && menuRef.current.hide()
        setDetailDialog(true)
    }

    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => props.onPress(props.name)}
            >
                <View style={{ width: '100%', alignItems: 'center' }} >
                    <AnimatedNeomorph
                        inner
                        useArt
                        swapShadowLevel
                        style={{
                            height: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [70, 160]
                            }),
                            width: WIDTH - 20,
                            shadowRadius: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 10]
                            }),
                            borderRadius: 20,
                            backgroundColor: COLOR1
                        }}
                    >
                        <View style={styles.infoContainer} >
                            <View style={{ maxWidth: WIDTH - 140 }} >
                                <Text style={styles.name} numberOfLines={1} >{props.name}</Text>
                                <Text style={styles.date} >{props.date}</Text>
                            </View>
                            <Text style={styles.audioLength} >{second2RecordingsFormat(audioInfo.duration)}</Text>
                        </View>
                        {detailUiOn && <Animated.View
                            style={{ opacity: animation }}
                        >
                            <View style={styles.progressBarContainer} >
                                <Slider
                                    style={styles.slider}
                                    thumbTintColor={COLOR2}
                                    maximumTrackTintColor='#fff'
                                    minimumTrackTintColor={COLOR2}
                                    maximumValue={duration}
                                    value={playSeconds}
                                    onValueChange={onSliderEditing}
                                />
                            </View>
                            <View style={styles.menusContainer} >
                                <View style={styles.menuComponentContainer} >
                                    <Text style={styles.menuCurrentTime}  >{second2RecordingsFormat(playSeconds)}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => {
                                    if (playState === 'paused') onPlay()
                                    else onPause()
                                }}>
                                    <View style={styles.iconContainer} >
                                        {playState === 'paused'
                                            ?
                                            <PlayIcon />
                                            :
                                            <PauseIcon />
                                        }

                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.menuComponentContainer} >
                                    <Menu
                                        style={{ backgroundColor: COLOR1 }}
                                        ref={menuRef}
                                        button={
                                            <TouchableWithoutFeedback onPress={() => menuRef.current && menuRef.current.show()} >
                                                <View style={styles.menuIconContainer} >
                                                    <MenuIcon />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        }
                                    >
                                        <MenuItem onPress={onShare} textStyle={{ color: '#fff' }} >Share</MenuItem>
                                        {/* <MenuItem onPress={onRename} textStyle={{ color: '#fff' }} >Rename</MenuItem> */}
                                        <MenuItem onPress={() => setDeleteDialog(true)} textStyle={{ color: '#fff' }} >Delete</MenuItem>
                                        <MenuItem onPress={onDetail} textStyle={{ color: '#fff' }} >Detail</MenuItem>
                                    </Menu>
                                </View>
                            </View>
                        </Animated.View>}
                    </AnimatedNeomorph>
                </View>
            </TouchableWithoutFeedback>
            <Dialog.Container
                visible={deleteDialog}
                contentStyle={{ backgroundColor: COLOR1, elevation: 0 }}
                onBackButtonPress={() => setDeleteDialog(false)}
                onBackdropPress={() => setDeleteDialog(false)}

            >
                <Dialog.Title style={{ color: '#fff' }} >Recording delete</Dialog.Title>
                <Dialog.Description style={{ color: '#fff' }} >
                    Do you want to delete this recording? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button style={{ color: '#fff' }} onPress={() => setDeleteDialog(false)} label="Cancel" />
                <Dialog.Button style={{ color: COLOR2 }} onPress={onDelete} label="Delete" />
            </Dialog.Container>

            <Dialog.Container
                visible={detailDialog}
                contentStyle={{ backgroundColor: COLOR1, elevation: 0 }}
                onBackButtonPress={() => setDetailDialog(false)}
                onBackdropPress={() => setDetailDialog(false)}

            >
                <Dialog.Title style={{ color: '#fff' }} >Recording detail</Dialog.Title>
                <Dialog.Description style={{ color: '#fff' }} >{`File: ${props.name}`}</Dialog.Description>
                <Dialog.Description style={{ color: '#fff' }} >{`Date: ${props.date}`}</Dialog.Description>
                <Dialog.Description style={{ color: '#fff' }} >{`Size: ${byteFormat(audioInfo.size)}`}</Dialog.Description>
                <Dialog.Description style={{ color: '#fff' }} >{`Sample rate: ${audioInfo.sampleRate}`}</Dialog.Description>
                <Dialog.Description style={{ color: '#fff' }} >{`Channel: ${audioInfo.numChannel}`}</Dialog.Description>
                <Dialog.Description style={{ color: '#fff' }} >{`Bit per sample rate: ${audioInfo.bitPerSample}`}</Dialog.Description>

                <Dialog.Button style={{ color: '#fff' }} onPress={() => setDetailDialog(false)} label="Close" />
            </Dialog.Container>
        </>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        height: 70,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    progressBarContainer: {
        height: 20
    },
    slider: {
        width: WIDTH - 32,
        alignSelf: 'center'
    },
    menusContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuCurrentTime: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.5
    },
    menuComponentContainer: {
        width: 80,
        alignItems: 'center'
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuIconContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default RecordingsCrad