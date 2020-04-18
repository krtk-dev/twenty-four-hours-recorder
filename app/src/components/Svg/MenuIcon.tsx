import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function MenuIcon() {
    return (
        <Svg width={15} height={3} viewBox="0 0 15 3">
            <G
                data-name="\uADF8\uB8F9 193"
                transform="translate(-310 -240)"
                opacity={0.5}
                fill="#fff"
            >
                <Circle
                    data-name="\uD0C0\uC6D0 4"
                    cx={1.5}
                    cy={1.5}
                    r={1.5}
                    transform="translate(322 240)"
                />
                <Circle
                    data-name="\uD0C0\uC6D0 5"
                    cx={1.5}
                    cy={1.5}
                    r={1.5}
                    transform="translate(316 240)"
                />
                <Circle
                    data-name="\uD0C0\uC6D0 6"
                    cx={1.5}
                    cy={1.5}
                    r={1.5}
                    transform="translate(310 240)"
                />
            </G>
        </Svg>
    )
}

export default MenuIcon
