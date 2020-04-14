import React from 'react'
import { StyleSheet, Text, View, Linking, Share } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BaseButton } from 'react-native-gesture-handler'
import { PLAYSTORE_URL } from '../../../components/value'

const option = [
    {
        text: 'Rate',
        icon: 'star',
        onPress: () => Linking.openURL(PLAYSTORE_URL)
    },
    {
        text: 'Share',
        icon: 'share-variant',
        onPress: () => Share.share({ message: PLAYSTORE_URL })
    },
    {
        text: 'Feedback',
        icon: 'thumbs-up-down',
        onPress: () => Linking.openURL(PLAYSTORE_URL)
    }
]

const InteractionTab = () => {
    return (
        <View style={{ marginTop: 10 }} >
            {option.map((item, index) =>
                <BaseButton
                    key={index}
                    style={styles.optionButton}
                    onPress={item.onPress}
                >
                    <Icon name={item.icon} size={18} color='#fff' />
                    <Text style={styles.option}  >{item.text}</Text>
                </BaseButton>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    optionButton: {
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    option: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 16
    }
})

export default InteractionTab