import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"

export default (gdkmonitor: Gdk.Monitor) => {
  const { TOP, BOTTOM, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="right"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | BOTTOM | RIGHT }
      marginBottom={10}
      marginTop={10}
      application={app}

    >
      <box class={""}>
        <label label={"hi"} />
      </box>
    </window>
  )
}

