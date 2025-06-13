import AstalHyprland from "gi://AstalHyprland"

import { bind } from "astal"
import { Astal } from "astal/gtk3"

const CurrentWindow = () => {
    const hyprland = AstalHyprland.get_default()

    const remap = {
        "zen": "zen-browser",
        "thunar": "org.xfce.thunar",
    }

    const focusedClient = (fc: AstalHyprland.Client) => {
        if (!fc) return <></>

        const mapped = remap[fc.initialClass]

        return <>
            <icon
                tooltipText={fc.initialClass}
                icon={mapped ? mapped : Astal.Icon.lookup_icon(fc.initialClass) ? fc.initialClass : "edit-select-all-symbolic" }
            />
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
