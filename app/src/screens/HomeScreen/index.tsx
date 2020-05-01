import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR1, WIDTH } from '../../components/style'


import Header from './Header'
import Body from './Body'
import Footer from './Footer'


const HomeScreen = () => {
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer} >
                <Header />
            </View>
            <View style={styles.bodyContainer} >
                <Body />
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
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerContainer: {
        width: '100%',
        height: 100
    }
})
