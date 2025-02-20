import AstalHyprland from "gi://AstalHyprland"

import { bind } from "astal"

const CurrentWindow = () => {
    const hyprland = AstalHyprland.get_default()

    return (
        <box>
            {
                bind(hyprland, "focused_client").as(fc => {
                    if (!fc) return
                    return <>
                        <icon icon={ bind(fc, "class") } />
                        <label label={ bind(fc, "initial_title") } />
                    </>
                })
            }
        </box>
    )
}

export { CurrentWindow }
