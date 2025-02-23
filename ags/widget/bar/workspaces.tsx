import AstalHyprland from "gi://AstalHyprland"
import Astal from "gi://Astal"

import { EventBox } from "astal/gtk3/widget"
import { bind, Variable } from "astal"
import { Gtk } from "astal/gtk3"

const Workspaces = () => {
    const hyprland = AstalHyprland.get_default()

    const workspace = (index: number) => {
        const onClickHandler = () => hyprland.dispatch("workspace", index.toString())

        let urgent = Variable(false)

        const className: Variable<string> = Variable.derive(
        [
            bind(hyprland, "focusedWorkspace"),
            bind(hyprland, "workspaces"),
            bind(urgent)
        ], (focusedWorkspace, workspaces, urg) => {
            if (urg && focusedWorkspace.id === index) {
                urgent.set(false)
                return "workspace-active"
            }
            if (urg) return "workspace-urgent"
            if (focusedWorkspace.id === index) return "workspace-active"
            for (let w of workspaces) if (w.id === index) return "workspace-idle"
            return "workspace-empty"
        })

        hyprland.connect("urgent", (_, client) => {
            if (client.workspace.id === index) urgent.set(true)
        })

        return (
            <button
            className={className()}
            onClicked={onClickHandler}>
                <box />
            </button>
        )
    }

    const scrollHandler = (_: EventBox, event: Astal.ScrollEvent) => {
        const dir = event.delta_y > 0 ? "e+1" : "e-1"
        hyprland.dispatch("workspace" ,dir)
    }

    return (
        <eventbox
        onScroll={scrollHandler}>
            <centerbox
            className={"workspaces"}>
                <box />
                <box halign={Gtk.Align.CENTER}>
                    {Array.from({length:10}, (_, i) => i+1).map(workspace)}
                </box>
                <box />
            </centerbox>
        </eventbox>
    )
}

export { Workspaces }
