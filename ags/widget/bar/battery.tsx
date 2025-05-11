import AstalBattery from "gi://AstalBattery";

import { bind } from "astal";

const bat = AstalBattery.get_default()
const batColor = bind(bat, "percentage").as(v => {
    if (v > 0.8) return "battery high"
    if (v > 0.2) return "battery medium"
    return "battery low"
})

const BatteryIcon = () => {
    return (
        <icon className={batColor} icon={bind(bat, "icon_name").as(n => {
            if (n === "battery-full-charged-symbolic") return "battery-full-charging-symbolic"
            return n
        })} />
    )
}

const Battery = () => {
    return (
        <box>
            <label className={batColor} label={bind(bat, "percentage").as(v => (v*100).toFixed(0) + '%')} />
            <BatteryIcon />
        </box>
    )
}

export { Battery, BatteryIcon }
