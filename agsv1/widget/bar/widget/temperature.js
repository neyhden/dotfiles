const thermal_zone = 0

let temperature = Variable("0", {
    poll: [2000, `cat /sys/class/thermal/thermal_zone${thermal_zone}/temp`]
})

const Temperature = () => Widget.Label({
    class_name: "margin-sides",
    label: temperature.bind().as(v => `${v.slice(0, -3)} ºC`),
})

export { Temperature }
