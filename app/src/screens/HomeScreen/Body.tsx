import React, { useRef, useEffect, useState } from 'react'
import { View, Animated, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, ScrollView, Easing } from 'react-native'
import TimeSelector from './TimeSelector'
import { WIDTH, CLOCK_COLORS } from '../../components/style'
import Clock from './Clock'
import { useSaveTime, index2Time } from '../../redux/SaveTime'
import { CLOCK_ANIMATION_DURATION } from '../../components/value'


const Body = () => {

    const { onChangeTimeIndex, saveTime } = useSaveTime()

    const [animation] = useState(new Animated.Value(0))

    const scrollViewRef = useRef<ScrollView>(null)
    const [isScrolling, setIsScrolling] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: CLOCK_ANIMATION_DURATION,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }, [])


    useEffect(() => { // 버튼클릭으로 전환
        if (!scrollViewRef.current || isScrolling || isDragging) return
        scrollViewRef.current.scrollTo({ x: WIDTH * saveTime.index, y: 0, animated: true })
    }, [saveTime.index])

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!isDragging) return
        const x = event.nativeEvent.contentOffset.x
        onChangeTimeIndex(Math.floor((x + (WIDTH / 2)) / WIDTH))
    }

    return (
        <View style={styles.container} >
            <View style={{ width: WIDTH }} >
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode='never'
                    onScroll={onScroll}
                    onMomentumScrollBegin={() => setIsScrolling(true)}
                    onMomentumScrollEnd={() => setIsScrolling(false)}
                    onScrollBeginDrag={() => setIsDragging(true)}
                    onScrollEndDrag={() => setIsDragging(false)}
                >
                    {CLOCK_COLORS.map((color, index) =>
                        <View key={index} style={{ width: WIDTH, alignItems: 'center', marginVertical: 20 }} >
                            <Clock
                                color={color}
                                time={index2Time(index)}
                                animation={animation}
                            />
                        </View>
                    )}
                </ScrollView>
            </View>
            <TimeSelector />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Body
