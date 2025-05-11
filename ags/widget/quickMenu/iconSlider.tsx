import { bind, Binding } from "astal"
import { Gtk } from "astal/gtk3"
import { Button, Slider } from "astal/gtk3/widget"

interface Props {
    iconName?: string | Binding<string | undefined>
    changeHandler?: (slider: Slider) => void
    clickHandler?: (button: Button) => void
    value?: number | Binding<number | undefined>
    valueString?: string | Binding<string | undefined>
    vertical?: boolean
    name?: string
}
const IconSlider = ({ name, vertical, iconName, changeHandler, clickHandler, value, valueString }: Props) => {
    const muteButton = (
        <button
        className={"subtle slider_icon"}
        onClick={clickHandler}>
            <icon icon={iconName} css={`
                font-size: 24px;
            `} />
        </button>
    )

    const theSlider = <slider
        vertical={vertical}
        inverted={vertical}
        min={0} max={1} value={value}
        step={0.01} page={0.01}
        hexpand={true}
        className={vertical ? "vertical" : "horizontal"}
        setup={self => {
        self.connect("change-value", (__: Slider, _: Gtk.ScrollType, value) => {
            self.value = value
            if (changeHandler) changeHandler(self)
            return false
        })
    }} />

    const valueLabel = <label xalign={vertical ? 0.5 : 1} label={valueString} />

    const nameLabel = <label label={name} />

    return (
        <box vertical={vertical}>
            {vertical
            ? [theSlider, valueLabel, muteButton, nameLabel]
            : [muteButton, theSlider, valueLabel]}
        </box>
    )
}

export { IconSlider  }
