import AstalHyprland from "gi://AstalHyprland"
import Astal from "gi://Astal"
import Gdk from "gi://Gdk"

import { EventBox } from "astal/gtk3/widget"
import { bind } from "astal"

const Workspaces = () => {
    const hyprland = AstalHyprland.get_default()

    const handleWorkspaces = (workspaces: AstalHyprland.Workspace[]) => {
        return Array.from({length:10}, (_, i) => i+1).map(i => (
            <button className={bind(hyprland, "focused_workspace").as(fw=>{
                if (fw.id == i) return "workspace-active"
                return "workspace-empty"
            })}
            onClicked={() => hyprland.dispatch("workspace", i.toString())}>
                <box />
            </button>
        ))
    }
    const scrollHandler = (_: EventBox, event: Astal.ScrollEvent) => {
        const dir = event.delta_y > 0 ? "e+1" : "e-1"
        hyprland.dispatch("workspace" ,dir)
    }
    return (
        <eventbox
        onScroll={scrollHandler}>
            <box>
                {bind(hyprland, "workspaces").as(handleWorkspaces)}
            </box>
        </eventbox>
    )
}

export { Workspaces }
