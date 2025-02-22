import { Astal, App, Gdk } from "astal/gtk3"

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
            <button onClicked={print.bind(null, "menu")}>
                QUIECK MENU
            </button>
        </window>
    )
}

export { QuickMenu }
