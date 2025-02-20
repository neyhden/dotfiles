import AstalNetwork from "gi://AstalNetwork"

import { App, Astal, astalify, Gtk } from "astal/gtk3"
import { Variable } from "astal"
import { bind } from "astal"

import { SysTray } from "./systray"
import { Battery } from "./battery"
import { ReloadStyle } from "./reloadstyle"
import { ColorPicker } from "./colorpicker"
import { Workspaces } from "./workspaces"
import { CurrentWindow } from "./currentwindow"
import { NetworkIcon } from "./network"


const time = Variable("").poll(1000, "date '+%H:%M'")

const Bar = (monitor: number) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const { START, CENTER, END } = Gtk.Align

    const net = AstalNetwork.get_default()
    const Separator = astalify(Gtk.Separator)

    
    return (
        <window
        className={"bar"}
        monitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
            <centerbox>
                <box halign={START}>
                    <Workspaces />
                    <Separator orientation={Gtk.Orientation.VERTICAL} />
                    <SysTray/>
                    <Separator />
                    <CurrentWindow />
                </box>

                <label halign={CENTER}>{time()}</label>

                <box  halign={END}>
                    <ReloadStyle />
                    <ColorPicker />
                    <NetworkIcon />
                    <Battery />
                </box>
            </centerbox>
        </window>
    );
}

export { Bar }
