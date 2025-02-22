import { Astal, App, Gdk } from "astal/gtk3"

const AppLauncher = () => {
    const handleKeyPress = (window: Astal.Window, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            window.hide()
        }
    }

    return (
        <window
        visible={false}
        name={"app_launcher"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        application={App}
        keymode={Astal.Keymode.ON_DEMAND}
        onKeyPressEvent={handleKeyPress}>
            <button onClicked={print.bind(null, "apps")}>
                APPS
            </button>
        </window>
    )
}

export { AppLauncher }
