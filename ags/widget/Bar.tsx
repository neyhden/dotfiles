import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"
import PopupRevealer from "./PopupRevealer"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 1000, "date +'%H:%M:%S'")
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
          <menubutton>
            <label label={"hi"} />
            <PopupRevealer>
              <label label={"hisadasd\nasdasdads\nadsasdasd\nasdasd"} />
            </PopupRevealer>
          </menubutton>
        </box>
        <box $type="end">
          <label label={"hi"} />
        </box>
      </centerbox>
    </window>
  )
}
