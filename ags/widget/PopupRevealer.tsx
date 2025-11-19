import { createState } from "ags"
import { Gtk } from "ags/gtk4"

type Props = {
  open?: boolean,
  children?: JSX.Element | Array<JSX.Element>,
}

export default (p: Props) => {
  const [visible, setVisible] = createState(false)
  const [reveal, setReveal] = createState(false)
  let popref: Gtk.Popover | null = null

  const show = () => {
    setVisible(true)
    setReveal(true)
  }
  
  const hide = () => {
    setReveal(false)
  }


  return (
    <popover
      visible={visible}
      hasArrow={false}
      autohide={false}
      onShow={() => {
        setVisible(true)
      }}
      onHide={() => {
        setVisible(false)
      }}
      $={self => {
        Object.assign(self, {popup: show, popdown: hide})
        popref = self
      }}
    >
      <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        revealChild={visible}
        onNotifyChildRevealed={self => {
          setVisible(self.childRevealed)
        }}
      >
        { p.children }
      </revealer>
    </popover>
  )
}
