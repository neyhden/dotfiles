import { App } from "astal/gtk3"

interface Props {
    children?: Array<JSX.Element>
}

const QuickMenuButton = ({ children }: Props) => {
    const onClickHandler = () => {
        App.toggle_window('quick_menu')
    }

    return (
        <button onClicked={onClickHandler}>
            <box>
                {children}
            </box>
        </button>
    )
}

export { QuickMenuButton }
