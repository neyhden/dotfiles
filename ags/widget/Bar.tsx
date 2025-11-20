import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import PopupRevealer from "./PopupRevealer"
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
      <label label={"hi"} />
      <centerbox>
        <box $type="start">
          <label label={"hi"} />
        </box>
        <box $type="center">
          <label label={"hi"} />
        </box>
        <box $type="end">
          <PopupRevealer>
            <Clock />
            <label label={"hisadasd\nasdasdads\nadsasdasd\nasdasd"} />
          </PopupRevealer>
        </box>
      </centerbox>
    </window>
  )
}
