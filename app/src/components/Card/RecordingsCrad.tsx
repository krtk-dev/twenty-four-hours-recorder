import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows'
import { WIDTH, COLOR1 } from '../style'
import PlayIcon from '../Svg/PlayIcon'
import MenuIcon from '../Svg/MenuIcon'


const AnimatedNeomorphBox = Animated.createAnimatedComponent(NeomorphBox)

interface RecordingsCradProps {
    name: string;
    date: string;
    audioLength: string;
    path: string;
    detail: boolean;
    onPress: (name: string) => void;
}

const RecordingsCrad: React.FC<RecordingsCradProps> = (props) => {

    const [animation] = useState(new Animated.Value(0))

    useEffect(() => {
        if (props.detail) {
            console.log(props.detail)
            Animated.timing(animation, {
                toValue: 1,
                useNativeDriver: false,
                duration: 200,
                easing: Easing.linear
            }).start()
        } else {
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: false,
                duration: 200,
                easing: Easing.linear
            }).start()
        }
    }, [props.detail])

    const onPlay = () => {

    }

    const onOption = () => {

    }

    return (
        <TouchableWithoutFeedback
            onPress={() => props.onPress(props.name)}
        >
            <View>
                <AnimatedNeomorphBox
                    inner
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
                        backgroundColor: COLOR1,
                        alignSelf: 'center'
                    }}
                >
                    <View style={styles.infoContainer} >
                        <View>
                            <Text style={styles.name} >{props.name}</Text>
                            <Text style={styles.date} >{props.date}</Text>
                        </View>
                        <Text style={styles.audioLength} >{props.audioLength}</Text>
                    </View>
                    <Animated.View
                        style={{ opacity: animation }}
                    >
                        <View style={styles.progressBarContainer} >

                        </View>
                        <View style={styles.menusContainer} >
                            <View style={styles.menuComponentContainer} >
                                <Text style={styles.menuCurrentTime}  >00:20</Text>
                            </View>
                            <TouchableWithoutFeedback
                                onPress={onPlay}
                            >
                                <View>
                                    <PlayIcon />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.menuComponentContainer} >
                                <TouchableWithoutFeedback
                                    onPress={onOption}
                                >
                                    <View>
                                        <MenuIcon />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </Animated.View>

                </AnimatedNeomorphBox>
            </View>
        </TouchableWithoutFeedback>
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
    },
    progressBarContainer: {
        height: 20
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
        width: 100,
        alignItems: 'center'
    }
})

export default RecordingsCrad