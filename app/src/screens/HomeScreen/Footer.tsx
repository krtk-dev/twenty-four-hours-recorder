import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows'
import { COLOR1 } from '../../components/style'
import LinearGradient from 'react-native-linear-gradient';

const Footer = () => {
    return (
        <View style={styles.container} >
            <NeomorphBox
                swapShadowLevel
                style={{
                    shadowRadius: 4,
                    borderRadius: 25,
                    backgroundColor: COLOR1,
                    width: 50,
                    height: 50,
                }}
            >
                <LinearGradient start={{ x: 0.25, y: 0.25 }} end={{ x: 1, y: 1 }} colors={[COLOR1, '#fff']}>

                </LinearGradient>
            </NeomorphBox>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    }
})

export default Footer