const ReloadCSS = () => Widget.Button({
    on_clicked: () => {
        const scss = `${App.configDir}/style/style.scss`
        const css = `${App.configDir}/style/style.css`
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
    child: Widget.Icon('applications-graphics-symbolic')
})

const ResetCSS = () => Widget.Button({
    on_clicked: () => {
        App.resetCss()
    },
    child: Widget.Icon('applications-science-symbolic')
})

export { ReloadCSS, ResetCSS }
