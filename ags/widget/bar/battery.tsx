import AstalBattery from "gi://AstalBattery";

import { bind } from "astal";

const Battery = () => {
    const bat = AstalBattery.get_default()

    return (
        <box className={bind(bat, "percentage").as(v => {
            if (v > 0.7) return "battery high"
            if (v > 0.3) return "battery medium"
            return "battery low"
        })}>
            <label label={bind(bat, "percentage").as(v => (v*100).toFixed(0) + '%')} />
            <icon icon={bind(bat, "icon_name").as(n => {
                if (n === "battery-full-charged-symbolic") return "battery-full-charging-symbolic"
                return n
            })} />
        </box>
    )
}

export { Battery }
