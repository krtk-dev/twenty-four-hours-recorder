import React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { EMAIL, FACEBOOK, INSTAGRAM } from '../../../components/value'
import { BaseButton } from 'react-native-gesture-handler'
import { DEFAULT_OPTION_BUTTON_HEIGHT } from '.'


const option = [
    {
        text: 'E-MAIL',
        onPress: () => Linking.openURL('mailto:' + EMAIL)
    },
    {
        text: 'FACEBOOK',
        onPress: () => Linking.openURL(FACEBOOK)
    },
    {
        text: 'INSTAGRAM',
        onPress: () => Linking.openURL(INSTAGRAM)
    }
]

const DeveloperTab = () => {
    return (
        <View >
            <Text style={styles.title} >DEVELOPER</Text>
            {option.map((item, index) =>
                <BaseButton
                    key={index}
                    onPress={item.onPress}
                    style={styles.optionButton}
                >
                    <Text style={styles.option} >{item.text}</Text>
                </BaseButton>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10
    },
    optionButton: {
        paddingHorizontal: 20,
        width: '100%',
        height: DEFAULT_OPTION_BUTTON_HEIGHT,
        justifyContent: 'center'
    },
    option: {
        color: '#fff',
        opacity: 0.5,
    }
})

export default DeveloperTab