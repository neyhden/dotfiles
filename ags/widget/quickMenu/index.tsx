import { Astal, App, Gdk } from "astal/gtk3"
import { TouchpadToggle, VpnToggle, WifiToggle } from "./toggles"

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
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        application={App}
        anchor={TOP | RIGHT}
        keymode={Astal.Keymode.ON_DEMAND}
        margin={4}
        onKeyPressEvent={handleKeyPress}>
            <box>
                <TouchpadToggle />
                <VpnToggle />
                <WifiToggle />
            </box>
        </window>
    )
}

export { QuickMenu }
