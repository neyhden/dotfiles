import { GObject, Variable } from "astal"
import { Astal, App, Gdk, astalify, Gtk } from "astal/gtk3"
import { Entry, Window } from "astal/gtk3/widget"
import { ConstructProps } from "astal/gtk4"
import AstalApps from "gi://AstalApps"

class FlowBox extends astalify(Gtk.FlowBox) {
    static { GObject.registerClass(this) }

    // @ts-ignore
    constructor(props: ConstructProps< FlowBox, Gtk.FlowBox.ConstructorProps >) {
        super(props as any)
    }
}

const AppLauncher = () => {
    const apps = new AstalApps.Apps({
        name_multiplier: 1,
        executableMultiplier: 0.1,
        descriptionMultiplier: 0.5,
        entryMultiplier: 0.8,
    })

    let entry: Entry
    let flowbox: FlowBox

    const appList = Variable(apps.fuzzy_query(""))

    const launchApp = (app: AstalApps.Application) => {
        App.toggle_window("app_launcher")
        app.launch()
    }

    const ApplicationItem = (app: AstalApps.Application) => {
        return (
            <button
            onClicked={() => launchApp(app)}
            tooltipText={
                "Entry: "+ app.entry +
                "\nExec: " + app.executable +
                // "\nScore: " + apps.fuzzy_score(entry.text, app).toFixed(2) +
                "\nFrequency: " + app.frequency
            }>
                <box vertical={true} >
                    <icon icon={
                        Astal.Icon.lookup_icon(app.iconName ?? "") ? app.iconName : "image-missing-symbolic"
                    } />
                    <label
                    justify={Gtk.Justification.CENTER}
                    truncate={true}
                    valign={Gtk.Align.CENTER}
                    label={app.name} />
                </box>
            </button>
        )
    }

    const reload = () => {
        apps.reload()
        entry.text = ""
        entry.grab_focus()
    }

    const EntryActivate = () => {
        launchApp(appList.get()[0])
    }

    const EntryChange = (entry: Entry) => {
        appList.set(apps.fuzzy_query(entry.text))
    }

    const handleKeyPress = (window: Astal.Window, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            window.hide()
        }
    }

    return (
        <Window
        visible={false}
        name={"app_launcher"}
        className={"app_launcher"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        application={App}
        keymode={Astal.Keymode.ON_DEMAND}
        onKeyPressEvent={handleKeyPress}
        setup={self => self.connect("show", reload)}>
            <box vertical={true}>
                <box>
                    <entry
                    hexpand={true}
                    placeholderText={"Application name..."}
                    setup={self => entry = self}
                    onActivate={EntryActivate}
                    onChanged={EntryChange} />
                    <button
                    visible={false}
                    onClicked={reload}
                    canFocus={false}>
                        <icon icon={"view-refresh-symbolic"} />
                    </button>
                </box>
                <scrollable
                hscroll={Gtk.PolicyType.NEVER}
                min_content_height={600}>
                    <FlowBox
                    homogeneous={true}
                    maxChildrenPerLine={7}
                    min_children_per_line={7}
                    setup={self => {
                        flowbox = self
                        appList.get().map(ApplicationItem).forEach(i => self.add(i))
                        self.show_all()
                        self.foreach(item => item.can_focus = false)
                        appList.subscribe(list => {
                            self.get_children().forEach(item => {
                                self.remove(item)
                                item.destroy()
                            })
                            list.map(ApplicationItem).forEach(i => self.add(i))
                            self.show_all()
                            self.foreach(item => {
                                item.can_focus = false
                            })
                        })
                    }} />

                </scrollable>
            </box>
        </Window>
    )
}

export { AppLauncher }
