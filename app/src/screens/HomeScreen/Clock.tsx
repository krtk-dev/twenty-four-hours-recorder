import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { COLOR1 } from '../../components/style';
import LinearGradient from 'react-native-linear-gradient';

const Clock = () => {
    return (
        <View style={{}} >
            <NeomorphBox
                swapShadowLevel
                style={{
                    shadowRadius: 10,
                    borderRadius: 200,
                    width: 240,
                    height: 240
                }}
            >
                <View style={{ flex: 1, borderRadius: 200, overflow: 'hidden' }} >
                    <LinearGradient style={{ flex: 1 }} start={{ x: 0.25, y: 0.25 }} end={{ x: 1, y: 1 }} colors={[COLOR1, '#fff']}>

                    </LinearGradient>
                </View>
            </NeomorphBox>
        </View>
    )
}

export default Clock

const styles = StyleSheet.create({})
