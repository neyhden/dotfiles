import { VolumeBox } from "./widget/audio.js"
import { BacklightBox } from "./widget/backlight.js"
import { Power } from "./widget/power.js"
import { Toggles } from "./widget/toggles.js"

const SettingsToggle = Widget.Button({
    on_clicked: () => App.toggleWindow("settings"),
    class_name: "bg",
    child: Widget.Icon("avatar-default-symbolic")
})

const SettingsWindow = () => Widget.Window({
    name: "settings",
    visible: false,
    anchor: ["top", "right"],
    margins: [5, 5, 0, 0],
    exclusivity: "exclusive",
    keymode: "exclusive",
    layer: "overlay",
    child: Widget.Box({
        vertical: true,
        class_name: "popwindow bg round",
        children: [
            Power(),
            Widget.Separator({ vertical: false }),
            VolumeBox(),
            Widget.Separator({ vertical: false }),
            BacklightBox(),
            Widget.Separator({ vertical: false }),
            // PowerProfiles(),
            Toggles()
        ]
    }),
    setup: self => self.keybind("Escape", () => App.closeWindow("settings")),
})

export { SettingsWindow, SettingsToggle }
