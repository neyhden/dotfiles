import AstalNetwork from "gi://AstalNetwork"

import { App, Astal, Gtk } from "astal/gtk3"
import { Variable } from "astal"
import { bind } from "astal"

import { SysTray } from "./systray"
import { Battery } from "./battery"
import { ReloadStyle } from "./reloadstyle"


const time = Variable("").poll(1000, "date '+%H:%M'")

const Bar = (monitor: number) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const { START, CENTER, END } = Gtk.Align

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
        className={"bar"}
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
                    <ReloadStyle />
                    <icon icon={bind(net, "primary").as(_ => networkIcon())} />
                    <Battery />
                </box>
            </centerbox>
        </window>
    );
}

export { Bar }
