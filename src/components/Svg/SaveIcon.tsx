import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
    return (
        <Svg width={21.953} height={23.949} viewBox="0 0 21.953 23.949" >
            <Path
                data-name="\uD328\uC2A4 17"
                d="M5.987 2V0h9.979v2zm0 3.992h9.979v-2H5.987zm9.979 6.985V7.983H5.987v4.989H0l10.977 10.977 10.976-10.977z"
                fill="#fff"
            />
        </Svg>
    )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
