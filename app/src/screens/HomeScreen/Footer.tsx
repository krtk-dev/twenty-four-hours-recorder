import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CircleButton from '../../components/Button/CircleButton';
import StoreIcon from '../../components/Svg/StorageIcon'
const Footer = () => {

    const { navigate } = useNavigation()
    return (
        <View style={styles.container} >
            <CircleButton
                onPress={() => { }}
                style={{ marginRight: 20 }}
            >
                <Text style={{ color: '#fff' }} >PRO</Text>
            </CircleButton>
            <CircleButton
                onPress={() => navigate("RecordHistory")}
            >
                <StoreIcon />
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