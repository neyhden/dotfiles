const LauncherToggle = () => Widget.Button({
    child: Widget.Icon('arch-symbolic'),
    on_clicked: () => App.toggleWindow("applauncher")
})

export { LauncherToggle }
