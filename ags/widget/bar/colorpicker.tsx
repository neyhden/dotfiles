import { execAsync } from "astal"

const ColorPicker = () => {
    const onClick = () => execAsync("hyprpicker -a -n")

    return (
        <button onClicked={onClick}>
            <icon icon={"dropper-symbolic"} />
        </button>
    )
}

export { ColorPicker }

