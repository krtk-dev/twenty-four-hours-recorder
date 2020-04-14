declare module 'react-native-neomorph-shadows' {
    import { ReactNode, PureComponent } from "react";
    import { StyleProp, ViewStyle } from "react-native";

    export interface ShadowBoxStyleProps {
        shadowColor?: string;
        shadowOffset?: {
            width?: number;
            height?: number;
        }
    }
    export interface ShadowBoxProps {
        inner?: boolean;
        useSvg?: boolean;
        children?: ReactNode;
        style?: ViewStyle & ShadowBoxStyleProps
        shadowOpacity?: number;
        shadowRadius?: number;
        width: number;
        height: number;
        borderRadius?: number;
        borderTopRightRadius?: number;
        borderTopLeftRadius?: number;
        borderBottomRightRadius?: number;
        borderBottomLeftRadius?: number;
        backgroundColor?: string;
    }

    export interface NeomorphBoxStyleProps {
        backgroundColor?: string;
        width: number;
        height: number;
        borderRadius?: number;
        shadowRadius?: number;
        shadowOpacity?: number;
        shadowOffset?: {
            width?: number;
            height?: number;
        }
    }
    export interface NeomorphBoxProps {
        inner?: boolean;
        swapShadowLevel?: boolean;
        useSvg?: boolean;
        children?: ReactNode;
        darkShadowColor?: string;
        lightShadowColor?: string;
        style: ViewStyle & NeomorphBoxStyleProps
    }

    export class ShadowBox extends PureComponent<ShadowBoxProps> { }
    export class NeomorphBox extends PureComponent<NeomorphBoxProps> { }
}