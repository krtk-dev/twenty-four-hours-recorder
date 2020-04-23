import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
    return (
        <Svg width={16} height={16} viewBox="0 0 16 16" >
            <Path
                data-name="\uD328\uC2A4 14"
                d="M2.293 1.333L2 0h12l-.3 1.333zm12.188 5.334l-1.048 8H2.531l-1.017-8zM16 5.333H0L1.357 16H14.6zM14.837 4l.247-1.333H.913L1.161 4z"
                fill="#fff"
            />
        </Svg>
    )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent