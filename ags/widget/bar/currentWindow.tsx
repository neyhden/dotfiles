import AstalHyprland from "gi://AstalHyprland"

import { bind } from "astal"
import { Astal } from "astal/gtk3"

const CurrentWindow = () => {
    const hyprland = AstalHyprland.get_default()


    const focusedClient = (fc: AstalHyprland.Client) => {
        if (!fc) return <></>
        return <>
            <icon icon={Astal.Icon.lookup_icon(fc.initialClass) ? fc.initialClass : "edit-select-all-symbolic" } />
            <label label={ bind(fc, "initial_title") } />
        </>
    }

    return (
        <box>
            { bind(hyprland, "focused_client").as(focusedClient) }
        </box>
    )
}

export { CurrentWindow }
