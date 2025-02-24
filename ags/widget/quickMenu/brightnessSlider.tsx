import { bind } from "astal"
import { IconSlider } from "./iconSlider"

import { Slider } from "astal/gtk3/widget"
import Brightness from "../../custom/brightness"

const BrightnessSlider = () => {
    const backlight = Brightness.get_default()

    const changeHandler = (slider: Slider) => {
        backlight.screen = slider.value
    }

    const iconFromValue = (value: number) => {
        return "weather-clear"
    }

    return <IconSlider
    valueString={ bind(backlight, "screen").as(v => (v*100).toFixed(0) + '%') }
    value={ bind(backlight, "screen") }
    changeHandler={changeHandler}
    iconName={ bind(backlight, "screen").as(iconFromValue) } />
}

export { BrightnessSlider }
