import Astal from "gi://Astal";
import AstalTray from "gi://AstalTray"
import { bind } from "astal";
import { Button } from "astal/gtk3/widget";
import Gtk from "gi://Gtk?version=3.0";

const SysTray = () => {
    const tray = AstalTray.get_default()

    const TrayComponent = (item: AstalTray.TrayItem) => {

        const openMenu = () => {
            item.about_to_show()
            const menu_model = item.get_menu_model()
            if (!menu_model) return;
            let menu = Gtk.Menu.new_from_model(menu_model)
            menu.insert_action_group('dbusmenu', item.action_group)
            menu.popup_at_pointer(null)
        }

        const handleClick = (button: Button, event: Astal.ClickEvent) => {
            button.set_state(Gtk.StateType.NORMAL)
            if (event.button == Astal.MouseButton.PRIMARY) {
                if (item.is_menu) {
                    openMenu()
                } else {
                    item.activate(0, 0)
                }
            } else if (event.button == Astal.MouseButton.SECONDARY) {
                openMenu()
            }
        }

        return (
            <button
            can_focus={false}
            tooltip_markup={bind(item, "title")}
            onClick={handleClick}>
                <icon gicon={item.gicon} />
            </button>
        )
    }

    return (
        <box>
            {bind(tray, "items").as(i => i.map(TrayComponent))}
        </box>
    )
}

export { SysTray }
