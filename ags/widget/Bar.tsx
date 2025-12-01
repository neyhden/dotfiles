import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import Clock from "./Clock"


export default (gdkmonitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT }
      application={app}
    >
      <centerbox>
        <box $type="start">
          <label label={"hi"} />
        </box>
        <box $type="center">
          <label label={"hi"} />
        </box>
        <box $type="end">
          <Clock>
            <Gtk.EventControllerMotion
              onEnter={() => app.toggle_window("right")}
            />
          </Clock>
        </box>
      </centerbox>
    </window>
  )
}
