import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import Modal from 'react-native-modal';
import { WIDTH, COLOR1, CLOCK_COLORS } from '../style';
import { EMAIL, PLAYSTORE_URL } from '../value';
import { useSetting } from '../../redux/Setting';

interface RateModalProps {
    visible: boolean;
    closeModal: () => void;
}

interface CardProps {
    title: string;
    answer1: string;
    answer2: string;
    answer1Func: () => void;
    answer2Func: () => void;
}


const RateModal: React.FC<RateModalProps> = ({ visible, closeModal }) => {

    const { onSetDontShowRate } = useSetting()

    const [cardState, setCardState] = useState<'question' | 'rate2Store' | 'opinion'>('question')

    useEffect(() => {
        if (visible) setCardState('question')
    }, [visible])

    const openStore = () => {
        Linking.openURL(PLAYSTORE_URL)
        onSetDontShowRate()
        closeModal()
    }

    const openEmail = () => {
        Linking.openURL('mailto:' + EMAIL)
        closeModal()
    }

    return (
        <Modal
            isVisible={visible}
            onBackButtonPress={closeModal}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            animationIn='zoomIn'
            animationOut='fadeOut'
            backdropOpacity={0.2}
            style={styles.container}
        >
            {cardState === 'question' && <Card
                title='Can you Enjoy well?'
                answer1='Yes, usefull app'
                answer2='No, not good'
                answer1Func={() => setCardState('rate2Store')}
                answer2Func={() => setCardState('opinion')}
            />}
            {cardState === 'rate2Store' && <Card
                title='Could you rate the store?'
                answer1='Yes'
                answer2='No thanks'
                answer1Func={openStore}
                answer2Func={closeModal}
            />}
            {cardState === 'opinion' && <Card
                title={`What should we improve?\nPlease give me your opinion.`}
                answer1='Yes'
                answer2='No thanks'
                answer1Func={openEmail}
                answer2Func={closeModal}
            />}

        </Modal>
    )
}


const Card: React.FC<CardProps> = ({ title, answer1, answer1Func, answer2, answer2Func }) =>
    <View style={styles.card} >
        <View style={{ height: 80, justifyContent: 'center' }} >
            <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }} >{title}</Text>
        </View>
        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={answer1Func} >
            <Text style={{ fontSize: 16, color: CLOCK_COLORS[0] }} >{answer1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={answer2Func} >
            <Text style={{ fontSize: 16, color: CLOCK_COLORS[1] }} >{answer2}</Text>
        </TouchableOpacity>
    </View>


const styles = StyleSheet.create({
    container: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: 270,
        height: 200,
        alignItems: 'center',
        backgroundColor: COLOR1,
        borderRadius: 4
    }
})

export default RateModal


