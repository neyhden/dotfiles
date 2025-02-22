const network = await Service.import("network")
const bluetooth = await Service.import("bluetooth")

const WifiToggle = () => Widget.ToggleButton({
    class_name: "toggle",
    focus_on_click: false,
    active: network.wifi.enabled ? true : false,
    on_toggled: () => {
        network.toggleWifi()
    },
    child: Widget.Icon('network-wireless-symbolic')
})

const BluetoothToggle = () => Widget.ToggleButton({
    class_name: "toggle",
    focus_on_click: false,
    active: bluetooth.enabled ? true : false,
    on_toggled: () => {
        bluetooth.toggle()
    },
    child: Widget.Icon('bluetooth-symbolic')
})

const TouchpadToggle = () => Widget.ToggleButton({
    class_name: "toggle",
    focus_on_click: false,
    active: true,
    on_toggled: ({ active }) => {
        Utils.exec(`hyprctl keyword "device[cust0001:00-04f3:30fa-touchpad]:enabled" "${active ? "true" : "false"}"`)
    },
    child: Widget.Icon('input-touchpad-symbolic')
})

const VpnToggle = () => Widget.ToggleButton({
    class_name: "toggle",
    focus_on_click: false,
    active: network.vpn.activated_connections.length != 0,
    on_toggled: ({ active }) => {
        network.vpn.connections[0].setConnection(active)
    },
    child: Widget.Icon('network-vpn-symbolic')
})

const RecordToggle = () => Widget.ToggleButton({
    class_name: "toggle",
    focus_on_click: false,
    active: false,
    on_toggled: ({ active }) => {
    },
    child: Widget.Icon("camera-video-symbolic")
})

const Toggles = () => Widget.FlowBox({
    setup: self => {
        self.add(WifiToggle())
        self.add(BluetoothToggle())
        self.add(TouchpadToggle())
        self.add(VpnToggle())
        self.add(RecordToggle())
    }
})

export { Toggles }
