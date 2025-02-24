import { Astal, App, Gdk, astalify, Gtk } from "astal/gtk3"
import { TouchpadToggle, VpnToggle, WifiToggle } from "./toggles"

import { Separator } from "../../custom/separator"

import { IconSlider } from "./iconSlider"
import { MicSlider, SpeakerSlider } from "./volumeSliders"
import { BrightnessSlider } from "./brightnessSlider"

const QuickMenu = () => {
    const { TOP, RIGHT } = Astal.WindowAnchor

    const handleKeyPress = (window: Astal.Window, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            window.hide()
        }
    }

    return (
        <window
        visible={false}
        name={"quick_menu"}
        className={"quick_menu"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        application={App}
        anchor={TOP | RIGHT}
        keymode={Astal.Keymode.ON_DEMAND}
        margin={4}
        onKeyPressEvent={handleKeyPress}>
            <box vertical={true}>
                <SpeakerSlider />
                <MicSlider />
                <BrightnessSlider />
                <Separator orientation={Gtk.Orientation.HORIZONTAL} />
                <box halign={Gtk.Align.CENTER}>
                    <TouchpadToggle />
                    <VpnToggle />
                    <WifiToggle />
                </box>
            </box>
        </window>
    )
}

export { QuickMenu }
