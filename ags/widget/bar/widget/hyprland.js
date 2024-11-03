const hyprland = await Service.import('hyprland')

const dispatch = (/** @type {string | number} */ ws) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    onScrollUp: () => dispatch('e-1'),
    onScrollDown: () => dispatch('e+1'),
    child: Widget.Box({
        class_name: "margin-sides",
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            class_name: hyprland.active.workspace.bind("id").as(id => {
                if (i === id) return "workspace-active"
                if (!hyprland.getWorkspace(i)) return "workspace-empty"
                if (!hyprland.getWorkspace(i)?.windows) return "workspace-empty"
                return "workspace-idle"
            }),
            attribute: i,
            onClicked: () => dispatch(i),
            child: Widget.Box({
                vpack: "center",
            })
        })),
    }),
})

const ActiveWindow= () => Widget.Box({
    children: [
        Widget.Icon({
            icon: hyprland.active.client.bind("class").as(i => {
                if (Utils.lookUpIcon(i)) return i
                let loweri = i.toLowerCase()
                if (Utils.lookUpIcon(loweri)) return loweri
                return "image-missing-symbolic"
            }),
            size: 20
        }),
        Widget.Label({
            label: hyprland.active.client.bind("title").as(t => t.slice(0, 40))
        })
    ]
})

export { Workspaces, ActiveWindow }
