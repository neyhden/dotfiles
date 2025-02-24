import { bind } from "astal"
import { IconSlider } from "./iconSlider"

import AstalWp from "gi://AstalWp"
import { Slider } from "astal/gtk3/widget"

const SpeakerSlider = () => {
    const wp = AstalWp.get_default()
    if (!wp) return <></>

    const clickHandler = () => {
        wp.defaultSpeaker.mute = !wp.defaultSpeaker.mute
    }
    const dragHandler = (slider: Slider) => {
        wp.defaultSpeaker.volume = slider.value
    }

    return <IconSlider
    clickHandler={clickHandler}
    valueString={ bind(wp.defaultSpeaker, "volume").as(v => (v*100).toFixed(0) + '%') }
    value={ bind(wp.defaultSpeaker, "volume") }
    changeHandler={dragHandler}
    iconName={ bind(wp.defaultSpeaker, "volumeIcon") } />
}

const MicSlider = () => {
    const wp = AstalWp.get_default()
    if (!wp) return <></>

    const clickHandler = () => {
        wp.defaultMicrophone.mute = !wp.defaultMicrophone.mute
    }
    const dragHandler = (slider: Slider) => {
        wp.defaultMicrophone.volume = slider.value
    }

    return <IconSlider
    clickHandler={clickHandler}
    valueString={ bind(wp.defaultMicrophone, "volume").as(v => (v*100).toFixed(0) + '%') }
    value={ bind(wp.defaultMicrophone, "volume") }
    changeHandler={dragHandler}
    iconName={ bind(wp.defaultMicrophone, "volumeIcon") } />
}

export { SpeakerSlider, MicSlider }
