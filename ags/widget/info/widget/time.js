let hour = Variable("00:00:00", {
    poll: [1000, `date '+%H:%M:%S'`]
})
const Hourbox = () => Widget.Label({
    class_name: "title",
    label: hour.bind()
})

let date = Variable("Today, something something", {
    poll: [10000, `date '+%A, %B %d'`]
})
const Datebox = () => Widget.Label({
    class_name: "subtitle",
    label: date.bind()
})

const TimeBox = () => Widget.Box({
    vertical: true,
    children: [
        Hourbox(),
        Datebox(),
    ]
})

export { TimeBox }
