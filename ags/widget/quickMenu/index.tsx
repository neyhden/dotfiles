import { Astal, App, Gdk, Gtk } from "astal/gtk3"
import { TouchpadToggle, VpnToggle, WifiToggle } from "./toggles"

import { Separator } from "../../custom/separator"
import { bind } from "astal"

import { MicSlider, SpeakerSlider, StreamSlider } from "./volumeSliders"
import { BrightnessSlider } from "./brightnessSlider"
import { SubIndex } from "./subIndex"
import AstalWp from "gi://AstalWp"
import { ActionButton } from "./actionButton"

const QuickMenu = () => {
    const wp = AstalWp.get_default();

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
                <box halign={Gtk.Align.END}>
                    <ActionButton command="reboot" iconName="view-refresh-symbolic" />
                    <ActionButton command="systemctl poweroff" iconName="system-shutdown-symbolic" />
                </box>
                <SpeakerSlider />
                <MicSlider />
                <SubIndex name="Streams" >
                    <box vertical={false} >
                        { wp && bind(wp.audio, "streams").as(s => s.map(StreamSlider)) }
                    </box>
                </SubIndex>
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
