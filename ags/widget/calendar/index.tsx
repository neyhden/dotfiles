import { App, Astal, astalify, Gdk, Gtk } from "astal/gtk3"

const Calen = astalify(Gtk.Calendar);

const Calendar = () => {
    const handleKeyPress = (window: Astal.Window, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            window.hide()
        }
    }

    return (
        <window
            name={"calendar"}
            visible={false}
            className={"calendar"}
            application={App}
            anchor={Astal.WindowAnchor.TOP}
            keymode={Astal.Keymode.ON_DEMAND}
            margin={4}
            onKeyPressEvent={handleKeyPress}>
            <Calen />
        </window>
    )
}

export { Calendar }
