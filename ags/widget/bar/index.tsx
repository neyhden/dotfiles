import { App, Astal, astalify, Gtk } from "astal/gtk3"
import { Variable } from "astal"

import { Separator } from "../../custom/separator"

import { SysTray } from "./sysTray"
import { Battery, BatteryIcon } from "./battery"
import { ColorPicker } from "./colorPicker"
import { Workspaces } from "./workspaces"
import { CurrentWindow } from "./currentWindow"
import { NetworkIcon } from "./network"
import { QuickMenuButton } from "./quickMenuButton"
import { AppLauncherButton } from "./appLauncherButton"
import { MicIcon, SpeakerIcon } from "./volumeIcons"


const time = Variable("").poll(1000, "date '+%H:%M'")

const Bar = (monitor: number) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
    const { START, CENTER, END } = Gtk.Align
    
    return (
        <window
        name={"bar"}
        className={"bar"}
        monitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
            <centerbox>
                <box halign={START}>
                    <AppLauncherButton />
                    <Workspaces />
                    <Separator orientation={Gtk.Orientation.VERTICAL} />
                    <SysTray/>
                    <Separator />
                    <CurrentWindow />
                </box>

                <button
                    onClick={() => App.toggle_window("calendar")}
                >
                    <label halign={CENTER}>{time()}</label>
                </button>

                <box halign={END}>
                    <ColorPicker />
                    <Battery />
                    <QuickMenuButton>
                        <MicIcon />
                        <SpeakerIcon />
                        <NetworkIcon />
                    </QuickMenuButton>
                </box>
            </centerbox>
        </window>
    );
}

export { Bar }
