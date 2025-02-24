import AstalWp from "gi://AstalWp"
import { bind } from "astal"

const SpeakerIcon = () => {
    const wp = AstalWp.get_default()
    if (!wp) return <></>
    return <icon icon={ bind(wp.defaultSpeaker, "volume_icon") } />
}

const MicIcon = () => {
    const wp = AstalWp.get_default()
    if (!wp) return <></>
    return <icon
    visible={ bind(wp.defaultMicrophone, "mute").as(m => !m) }
    className={"error"}
    icon={ bind(wp.defaultMicrophone, "volume_icon") } />
}

export { SpeakerIcon, MicIcon }
