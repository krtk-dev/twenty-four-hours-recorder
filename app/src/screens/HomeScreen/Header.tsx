import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows';
import { COLOR1 } from '../../components/style';

const Header = () => {
    return (
        <View style={styles.container} >
            <View style={styles.titleGroup} >
                <Text style={{ ...styles.title, fontSize: 16 }} >24h</Text>
                <Text style={{ ...styles.title, fontSize: 28 }} >Recorder</Text>
            </View>
            <NeomorphBox
                swapShadowLevel
                style={{
                    shadowRadius: 10,
                    borderRadius: 25,
                    backgroundColor: COLOR1,
                    width: 50,
                    height: 50,
                }}
            ></NeomorphBox>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleGroup: {
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: 'bold'
    }
})


export default Header
