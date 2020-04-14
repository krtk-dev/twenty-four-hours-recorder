import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CircleButton from '../../components/Button/CircleButton'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
    const { navigate } = useNavigation()
    return (
        <View style={styles.container} >
            <View style={styles.titleGroup} >
                <Text style={{ ...styles.title, fontSize: 16 }} >24h</Text>
                <Text style={{ ...styles.title, fontSize: 28 }} >Recorder</Text>
            </View>
            <CircleButton
                onPress={() => navigate('Setting')}
            >
                <Icon name='settings' color='#fff' size={20} />
            </CircleButton>
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
        fontWeight: 'bold',
        color: '#fff'
    }
})


export default Header
