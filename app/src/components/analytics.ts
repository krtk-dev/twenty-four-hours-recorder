import analytics from '@react-native-firebase/analytics';

export const saveLog = (time: number) => {
    analytics().logSelectContent({
        content_type: 'save record',
        item_id: "" + time
    })
}