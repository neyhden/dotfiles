import Astal from "gi://Astal";
import AstalTray from "gi://AstalTray"
import { bind } from "astal";
import { Button } from "astal/gtk3/widget";
import Gtk from "gi://Gtk?version=3.0";

const SysTray = () => {
    const tray = AstalTray.get_default()

    const TrayComponent = (item: AstalTray.TrayItem) => {
        let menu = null 
        if (item.menu_model) menu = Gtk.Menu.new_from_model(item.menu_model)

        const handleClick = (button: Button, event: Astal.ClickEvent) => {
            if (event.button == Astal.MouseButton.PRIMARY) {
                item.activate(event.x, event.y)
            } else if (event.button == Astal.MouseButton.SECONDARY) {
                menu?.popup_at_pointer(null)
            }
        }

        return (
            <button
            tooltip_markup={bind(item, "title")}
            onClick={handleClick}>
                <icon gicon={item.gicon} />
            </button>
        )
    }

    return (
        <box>
            {bind(AstalTray.get_default(), "items").as(i => i.map(TrayComponent))}
        </box>
    )
}

export { SysTray }
