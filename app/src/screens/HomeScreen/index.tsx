import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR1 } from '../../components/style'


import Clock from './Clock'
import Header from './Header'
import Footer from './Footer'
import { NeomorphBox } from 'react-native-neomorph-shadows'
import { Text } from 'react-native-svg'


const HomeScreen = () => {
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer} >
                <Header />
            </View>
            <View style={styles.clockContainer} >
                <Clock />
                <NeomorphBox
                    style={{
                        height: 70,
                        width: 300,
                        shadowRadius: 9,
                        borderRadius: 20,
                        backgroundColor: COLOR1,
                        position: 'absolute',
                        translateY: 200
                    }}
                    inner
                >
                    <Text>hi</Text>
                </NeomorphBox>
            </View>
            <View style={styles.footerContainer} >
                <Footer />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR1
    },
    headerContainer: {
        width: '100%',
        height: 100
    },
    clockContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerContainer: {
        width: '100%',
        height: 100
    }
})
