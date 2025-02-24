import { bind, Binding } from "astal"
import { Gtk } from "astal/gtk3"
import { Button, Slider } from "astal/gtk3/widget"

interface Props {
    iconName?: string | Binding<string | undefined>
    changeHandler?: (slider: Slider) => void
    clickHandler?: (button: Button) => void
    value?: number | Binding<number | undefined>
    valueString?: string | Binding<string | undefined>
}
const IconSlider = ({ iconName, changeHandler, clickHandler, value, valueString }: Props) => {
    return (
        <box>
            <button className={"subtle slider_icon"} onClick={clickHandler}>
                <icon icon={iconName} />
            </button>
            <slider
            min={0} max={1} value={value}
            step={0.01} page={0.01}
            hexpand={true}
            setup={self => {
                self.connect("change-value", (__: Slider, _: Gtk.ScrollType, value) => {
                    self.value = value
                    if (changeHandler) changeHandler(self)
                    return false
                })
            }}
            />
            <label xalign={1} label={valueString} />
        </box>
    )
}

export { IconSlider  }
