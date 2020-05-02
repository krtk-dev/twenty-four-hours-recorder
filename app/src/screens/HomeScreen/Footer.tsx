import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CircleButton from '../../components/Button/CircleButton';
import StoreIcon from '../../components/Svg/StorageIcon'
import InAppBilling from 'react-native-billing'
import { PRODUCT_ID_PRO } from '../../components/value';
import { useSetting } from '../../redux/Setting';

const Footer = () => {

    const { navigate } = useNavigation()
    const { onSetPro, setting } = useSetting()

    const initPro = async () => { // init 실페하더라도 최신 저장 데이터로
        try {
            await InAppBilling.open();
            const isPurchased = await InAppBilling.isPurchased(PRODUCT_ID_PRO)
            onSetPro(isPurchased)
        } finally {
            await InAppBilling.close();
        }
    }

    useEffect(() => {
        initPro()
    }, [])

    const billingPro = async () => {
        await InAppBilling.close();
        try {
            await InAppBilling.open();
            const isPurchased = await InAppBilling.isPurchased(PRODUCT_ID_PRO)
            if (isPurchased) {
                ToastAndroid.show('You are already pro. Please reload this app.', ToastAndroid.SHORT)
                return
            }
            await InAppBilling.purchase(PRODUCT_ID_PRO);
            onSetPro(true)
        } catch (err) {
            console.log(err);
            ToastAndroid.show('Fail', ToastAndroid.SHORT)
        } finally {
            await InAppBilling.close();
        }
    }

    return (
        <View style={styles.container} >
            {!setting.pro && <CircleButton
                onPress={billingPro}
                style={{ marginRight: 20 }}
            >
                <Text style={{ color: '#fff' }} >PRO</Text>
            </CircleButton>}
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