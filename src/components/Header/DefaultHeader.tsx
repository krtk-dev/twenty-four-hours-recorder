import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { COLOR1 } from '../style'
import Icon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native'

interface DefaultHeaderProps {
    title: string;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title }) => {

    const { goBack } = useNavigation()

    return (
        <View style={styles.container} >
            <Text style={styles.title}>{title}</Text>
            <TouchableWithoutFeedback
                onPress={goBack}
            >
                <Icon name='close' size={30} color='#fff' />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default DefaultHeader

const styles = StyleSheet.create({
    container: {
        height: 76,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLOR1
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },

})
