import { App, Astal, Gtk } from "astal/gtk3"
import { Variable } from "astal"
import AstalBattery from "gi://AstalBattery"
import { bind } from "astal"
import AstalNetwork from "gi://AstalNetwork"
import { SysTray } from "./systray"

const time = Variable("").poll(1000, "date '+%H:%M'")

const Bar = (monitor: number) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const { START, CENTER, END } = Gtk.Align

    const bat = AstalBattery.get_default()
    const net = AstalNetwork.get_default()

    const networkIcon = (): string => {
        const errorIcon = "network-vpn-symbolic";
        if (net.get_primary() == AstalNetwork.Primary.WIFI) {
            return net.get_wifi()?.iconName || errorIcon
        }
        if (net.get_primary() == AstalNetwork.Primary.WIRED) {
            return net.get_wired()?.iconName || errorIcon
        }
        return errorIcon
    }
    
    return (
        <window
        monitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
            <centerbox>
                <box halign={START}>
                    <SysTray/>
                </box>

                <label halign={CENTER}>{time()}</label>

                <box  halign={END}>
                    <icon icon={bind(net, "primary").as(_ => networkIcon())} />
                    <label label={bind(bat, "percentage").as(v => (v*100).toFixed(0)+'%')} />
                    <icon icon={bind(bat, "iconName")} />
                </box>
            </centerbox>
        </window>
    );
}

export { Bar }
