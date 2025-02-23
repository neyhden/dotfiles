import AstalNetwork from "gi://AstalNetwork?version=0.1"

import { exec, execAsync } from "astal"
import { Button } from "astal/gtk3/widget"

const WifiToggle = () => {
    const net = AstalNetwork.get_default()
    let active = net.wifi.enabled

    const onToggleHandler = (toggle: Button) => {
        active = !active
        toggle.toggleClassName("active", active)
        net.wifi.enabled = !net.wifi.enabled
    }

    return (
        <button
        className={"toggle"}
        onClicked={onToggleHandler}
        focusOnClick={false}
        setup={self => self.toggleClassName("active", active)}>
            <icon icon={"network-wireless-symbolic"} />
        </button>
    )
}

const TouchpadToggle = () => {
    let active = true

    const onToggleHandler = (toggle: Button) => {
        active = !active
        toggle.toggleClassName("active", active)
        exec(`hyprctl keyword "device[cust0001:00-04f3:30fa-touchpad]:enabled" "${active ? "true" : "false"}"`)
    }

    return (
        <button
        className={"toggle"}
        onClicked={onToggleHandler}
        focusOnClick={false}
        setup={self => self.toggleClassName("active", active)}>
            <icon icon={"input-touchpad-symbolic"} />
        </button>
    )
}

const VpnToggle = () => {
    const state = exec("nmcli -f GENERAL.STATE c show madrid") 
    let active = state.length > 0 ? true : false

    const onToggleHandler = (toggle: Button) => {
        active = !active
        toggle.toggleClassName("active", active)
        execAsync(`nmcli c ${active ? "up" : "down"} madrid`)
    }

    return (
        <button
        className={"toggle"}
        onClicked={onToggleHandler}
        focusOnClick={false}
        setup={self => self.toggleClassName("active", active)}>
            <icon icon={"network-vpn-symbolic"} />
        </button>
    )
}

export { TouchpadToggle, VpnToggle, WifiToggle }

/*
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
*/
