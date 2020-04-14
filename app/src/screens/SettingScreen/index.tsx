import React from 'react'
import { ScrollView } from 'react-native'
import Header from './Header'
import { InteractionTab, DeveloperTab, QuilityTab, RecordingLocationTab } from './Tabs'

const SettingScreen = () => {
    return (
        <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
        >
            <Header />
            <QuilityTab />
            <RecordingLocationTab />
            <InteractionTab />
            <DeveloperTab />
        </ScrollView>
    )
}

export default SettingScreen