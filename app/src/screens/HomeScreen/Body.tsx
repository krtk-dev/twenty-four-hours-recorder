import React, { useRef, useEffect, useState } from 'react'
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native'
import TimeSelector from './TimeSelector'
import { WIDTH } from '../../components/style'
import Clock from './Clock'
import { useSaveTime, time2Index } from '../../redux/SaveTime'

const Body = () => {

    const { onChangeTime, saveTime } = useSaveTime()

    const scrollViewRef = useRef<ScrollView>(null)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        if (!scrollViewRef.current) return
        if (isScrolling) return
        scrollViewRef.current.scrollTo({ x: WIDTH * time2Index(saveTime.time), y: 0, animated: true })
    }, [saveTime.time])

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x
        if (x <= WIDTH / 2) {
            onChangeTime(30)
        } else if (x <= WIDTH / 2 + WIDTH) {
            onChangeTime(300)
        } else if (x <= WIDTH / 2 + WIDTH * 2) {
            onChangeTime(900)
        } else {
            onChangeTime(1800)
        }
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
                >
                    <View style={{ width: WIDTH, alignItems: 'center', marginVertical: 20 }} >
                        <Clock
                        />
                    </View>
                    <View style={{ width: WIDTH, alignItems: 'center', marginVertical: 20 }} >
                        <Clock />
                    </View>
                    <View style={{ width: WIDTH, alignItems: 'center', marginVertical: 20 }} >
                        <Clock />
                    </View>
                    <View style={{ width: WIDTH, alignItems: 'center', marginVertical: 20 }} >
                        <Clock />
                    </View>
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
