const Reboot = () => Widget.Button({
    class_name: "round margin",
    child: Widget.Label({
        label: " Reboot"
    }),
    on_clicked: () => Utils.exec("reboot")
})

const PowerOff = () => Widget.Button({
    class_name: "round margin",
    child: Widget.Label({
        label: "⏻ Shut down"
    }),
    on_clicked: () => Utils.exec("systemctl poweroff")
})

const PowerBox = () => Widget.Box({
    vertical: true,
    class_name: "cell round",
    children: [
        PowerOff(),
        Reboot()
    ]
})

let PowerRevealer = Widget.Revealer({
    reveal_child: false,
    transition: "slide_down",
    child: PowerBox()
})

const PowerToggler = () => Widget.Button({
    class_name: "round cell-button",
    child: Widget.Icon({
        icon: "system-shutdown-symbolic",
        size: 42
    }),
    on_clicked: () => PowerRevealer.reveal_child = !PowerRevealer.reveal_child
})

const Power = () => Widget.Box({
    hpack: "start",
    vertical: true,
    children: [
        PowerToggler(),
        PowerRevealer,
    ]
})

export { Power }
