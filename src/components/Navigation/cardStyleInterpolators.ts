
import { Animated } from 'react-native'
import { StackCardStyleInterpolator } from "@react-navigation/stack";

export const defaultInterpolator: StackCardStyleInterpolator = ({ current, inverted, layouts, next }) => {
    const translateFocused = Animated.multiply(current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [layouts.screen.height, 0],
        extrapolate: 'clamp'
    }), inverted);
    const translateUnfocused = next ? Animated.multiply(next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -200],
        extrapolate: 'clamp'
    }), inverted) : 0;
    return {
        cardStyle: {
            transform: [// Translation for the animation of the current card
                {
                    translateY: translateFocused
                }, // Translation for the animation of the card on top of this
                {
                    translateY: translateUnfocused
                }
            ]
        },
    };
}