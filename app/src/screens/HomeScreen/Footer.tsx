import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows'
import { COLOR1 } from '../../components/style'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CircleButton from '../../components/Button/CircleButton';

const Footer = () => {

    const { navigate } = useNavigation()
    return (
        <View style={styles.container} >
            <CircleButton
                onPress={() => navigate("RecordHistory")}
            >

            </CircleButton>

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