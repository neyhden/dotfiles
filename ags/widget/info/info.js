const mpris = await Service.import("mpris")
const notifications = await Service.import("notifications")

import { Calendar } from "./widget/calendar.js"
import { Media } from "./widget/mpris.js"
import { Notifications } from "./widget/notifications.js"
import { TimeBox } from "./widget/time.js"

const InfoToggle = () => Widget.Button({
    // child: Widget.Label().poll(1000, self => self.label = Utils.exec("date '+%H:%M'")),
    child: Widget.Box({
        children: [
            Widget.Icon({
                visible: notifications.bind("notifications").as(n => n.length > 0),
                icon: "bell-symbolic",
            }),
            Widget.Label().poll(1000, self => self.label = Utils.exec("date '+%H:%M'")),
        ]
    }),
    on_clicked: () => App.toggleWindow("info")
})

const InfoWindow = () => Widget.Window({
    name: "info",
    visible: false,
    anchor: ["top"],
    margins: [5, 0, 0, 0],
    exclusivity: "normal",
    layer: "overlay",
    keymode: "exclusive",
    child: Widget.Box({
        vertical: true,
        class_name: "popwindow bg round",
        children: [
            TimeBox(),
            Widget.Separator({ vertical: false }),
            Widget.Box({
                vertical: false,
                children: [
                    Notifications(),
                    Widget.Separator({ vertical: true }),
                    Calendar(),
                    Widget.Separator({ vertical: true }),
                    Media,
                ]
            }),
        ]
    }),
    setup: self => {
        self.keybind("Escape", () => App.closeWindow("info"))
        self.keybind("space", () => mpris.players.forEach(plyr => plyr.playPause()))
    }
})

export { InfoToggle, InfoWindow }
