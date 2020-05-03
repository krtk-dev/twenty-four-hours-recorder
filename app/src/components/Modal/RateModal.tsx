import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { WIDTH, COLOR1, CLOCK_COLORS } from '../style';

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
            <Card
                title='Can you Enjoy well?'
                answer1='Yes, usefull app'
                answer2='No, not good'
            />
        </Modal>
    )
}


const Card: React.FC<CardProps> = ({ title, answer1, answer1Func, answer2, answer2Func }) =>
    <View style={styles.card} >
        <View style={{ height: 80, justifyContent: 'center' }} >
            <Text style={{ fontSize: 18, color: '#fff' }} >{title}</Text>
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


