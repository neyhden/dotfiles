import { createState } from "ags";
import { toggleWindow } from "ags/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

export const QuickPanel = (gdkmonitor: Gdk.Monitor) => {
  const { TOP, BOTTOM, RIGHT } = Astal.WindowAnchor

  const [open, setOpen] = createState(false)

  return (
    <window
      visible
      name="quickpanel"
      class="quickpanel"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | BOTTOM | RIGHT }
      application={app}
    >
      <revealer
        class={"quickpanelbox"}
        hexpand={false}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        revealChild={open(val => val)}
      >
        <Gtk.EventControllerMotion
          propagationPhase={Gtk.PropagationPhase.CAPTURE}
          onEnter={self => {
            setOpen(true)
          }}
          onLeave={self => {
            setOpen(false)
          }}
        />
        <label label={"hjañlsdkjfñajksldfjlkajsdñjkajflñkdjkfsajkñldsakji"} />
      </revealer>
    </window>
  )
}
