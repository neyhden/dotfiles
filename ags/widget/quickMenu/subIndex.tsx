import { Gtk } from "astal/gtk3"
import { Revealer } from "astal/gtk3/widget"
import { Binding, Variable } from "astal";

interface Props {
    name: string,
    child?: JSX.Element | Binding<JSX.Element> | Binding<Array<JSX.Element>>
}
const SubIndex = ({name, child}: Props) => {
    let open = Variable(false)

    return (
        <box vertical={true} className={"subindex"} >
            <button
            className={"subtle"}
            onClick={() => open.set(!open.get())}
            label={name} />
                <revealer
                revealChild={open()}
                transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN} >
                    {child}
                </revealer>
        </box>
    )
}

export { SubIndex }
