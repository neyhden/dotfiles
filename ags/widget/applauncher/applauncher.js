const app_service = await Service.import("applications")
const WINDOW_NAME = "applauncher"

/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
const AppItem = app => Widget.Button({
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
    },
    attribute: { app },
    child: Widget.Box({
        class_name: "",
        vertical: true,
        tooltip_text: app.icon_name + '\n' + app.executable + '\n' + app.desktop,
        children: [
            Widget.Icon({
                icon: Utils.lookUpIcon(app.icon_name ?? "") ? app.icon_name ?? "image-missing-symbolic" : "image-missing-symbolic",
                size: 64,
            }),
            Widget.Label({
                justification: "center",
                vpack: "center",
                label: app.name,
                truncate: "end",
            }),
        ],
    }),
})

const Applauncher = (width = 1000, height = 600) => {
    // list of application buttons
    let applications = app_service.query("").map(AppItem)

    let list = Widget.FlowBox({
        min_children_per_line: 10,
        setup: self => {
            applications.forEach(app => self.add(app))
            self.show_all()
            self.foreach(item => item.can_focus = false)
        }
    })

    const reload = Widget.Button({
        on_clicked: () => {
            entry.set_text("")
            list.get_children().forEach(item => {
                list.remove(item)
                item.destroy()
            })
            app_service.reload()
            applications = app_service.query("").map(AppItem)
            applications.forEach(app => list.add(app))
            list.show_all()
            list.foreach(item => item.can_focus = false)
        },
        can_focus: false,
        child: Widget.Icon({
            icon: "view-refresh-symbolic",
            size: 64,
        })
    })

    // search entry
    const entry = Widget.Entry({
        hexpand: true,
        on_accept: () => {
            if (!list.get_child_at_pos(0, 0)) return
            App.toggleWindow(WINDOW_NAME)
            // @ts-ignore
            list.get_child_at_pos(0, 0)?.child.attribute.app.launch()
        },

        // filter out the list
        on_change: ({ text }) => {
            list.set_filter_func(child => {
                // @ts-ignore
                return child.child.attribute.app.match(text ?? "")
            })
            list.set_sort_func((child1, child2) => {
                // @ts-ignore
                let freq1 = child1.child.attribute.app.frequency
                // @ts-ignore
                let freq2 = child2.child.attribute.app.frequency
                return freq1 > freq2 ? 0 : 1
            })
        }
    })

    return Widget.Box({
        vertical: true,
        class_name: "popwindow bg round",
        children: [
            Widget.Box({ children: [
                entry,
                reload
            ]}),

            // wrap the list in a scrollable
            Widget.Scrollable({
                hscroll: "never",
                css: `min-width: ${width}px;`
                    + `min-height: ${height}px;`,
                child: list,
            }),
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return

            // when the applauncher shows up
            if (visible) {
                entry.text = ""
                entry.grab_focus()
            }
        }),
    })
}

// there needs to be only one instance
export const applauncher = Widget.Window({
    name: WINDOW_NAME,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
    child: Applauncher(),
})
