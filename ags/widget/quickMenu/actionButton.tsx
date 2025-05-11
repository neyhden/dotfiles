import { execAsync } from "astal"

const ActionButton = (
    { iconName, command }:
    { iconName?: string, command?: string }
) => {
    const clickHandler = () => {
        if (command) execAsync(command)
    }

    return (
        <button className={"subtle action"} onClicked={clickHandler}>
            <icon icon={iconName} />
        </button>
    )
}

export { ActionButton }
