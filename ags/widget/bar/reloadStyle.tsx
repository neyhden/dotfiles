import { App } from "astal/gtk3"
import { exec, readFile } from "astal"


const ReloadStyle = () => {
    const onClick = () => {
        const scss_file = "./style/style.scss"
        const css_file = "./style/style.css"
        exec(`sass ${scss_file} ${css_file}`)
        const css = readFile(css_file)
        App.apply_css(css)
    }

    return (
        <button onClicked={onClick}>
            <icon icon={"applications-graphics-symbolic"} />
        </button>
    )
}

export { ReloadStyle }
