import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import BackgroundAudioRecord from '../../modules/BackgroundAudioRecord'
import { BaseButton } from 'react-native-gesture-handler'
import moment from 'moment'
import { InterstitialAd, TestIds, AdEventType, RewardedAd, RewardedAdEventType, BannerAdSize, BannerAd } from '@react-native-firebase/admob'
import analytics from '@react-native-firebase/analytics';
import { saveLog } from '../../components/analytics'

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
    requestNonPersonalizedAdsOnly: true
});

const HomeScreen = () => {
    const [interstitialLoad, setInterstitialLoad] = useState(false);
    const [rewardedLoad, setRewardedLoad] = useState(false);

    useEffect(() => {
        console.log("load")
        BackgroundAudioRecord.startService()
    }, [])

    useEffect(() => {
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setInterstitialLoad(true);
            }
            if (type === AdEventType.OPENED) {
                BackgroundAudioRecord.saveRecording(900, "Recording-" + Date.now(), (state: string) => console.log(state))
                saveLog(15)
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };
    }, []);

    useEffect(() => {
        const eventListener = rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                setRewardedLoad(true);
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of ', reward);
                BackgroundAudioRecord.saveRecording(1800, "Recording-" + Date.now(), (state: string) => console.log(state))
                saveLog(30)
            }
        });

        rewarded.load();

        return () => {
            eventListener();
        };
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 200 }} >
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <BaseButton
                onPress={() => {
                    BackgroundAudioRecord.saveRecording(300, "Recording-" + moment().format("YYYY-MM-DD-h:mm:ss"), (state: string) => console.log(state))
                    saveLog(5)
                }}
            >
                <Text>5분 저장 Save Recording</Text>
            </BaseButton>
            <TouchableWithoutFeedback
                onPress={() => { interstitial.show() }}
            >
                <Text>15분 저장 Save Recording</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => { rewarded.show(); }}
            >
                <Text>30분 저장 Save Recording</Text>
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeScreen
