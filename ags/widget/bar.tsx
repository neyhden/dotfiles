import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 1000, "date")
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT }
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start">
          <label label={"hi"} />
        </box>
        <box $type="center">
          <label label={"hi"} />
        </box>
        <box $type="end">
          <label label={"hi"} />
        </box>
      </centerbox>
    </window>
  )
}
