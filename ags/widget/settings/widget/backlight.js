import backlight from "../../../service/brighness.js"

const Slider = () => Widget.Slider({
    hexpand: true,
    min: 0,
    max: 1,
    draw_value: false,
    onChange: ({ value }) => backlight.screen_value = value,
    value: backlight.bind("screen_value")
})

const Icon = () => Widget.Button({
    child: Widget.Icon("display-brightness-symbolic")
})

const Value = () => Widget.Label({
    class_name: "slider_label",
    label: backlight.bind("screen_value").as(v => `${(v*100).toFixed(0)}%`)
})

const BacklightBox = () => Widget.Box({
    class_name: "round",
    children: [
        Icon(),
        Slider(),
        Value()
    ]
})

export { BacklightBox }
