import { App } from "astal/gtk3"

const AppLauncherButton = () => {
    const toggleAppLauncher = () => {
        App.toggle_window("app_launcher")
    }

    return (
        <button onClicked={toggleAppLauncher}>
            <icon icon={"arch-symbolic"} />
        </button>
    )
}

export { AppLauncherButton }
