up() {
	pactl set-sink-volume @DEFAULT_SINK@ +2%
	NOW=$(pactl get-sink-volume @DEFAULT_SINK@ | awk '{print $5}' | sed 's/.\{1\}$//')
	if [[ "$NOW" -gt "100" ]]; then
		pactl set-sink-volume @DEFAULT_SINK@ 100%
	fi
}

down() {
	pactl set-sink-volume @DEFAULT_SINK@ -2%
}

if [[ "$1" == "--up" ]]; then
	up
elif [[ "$1" == "--down" ]]; then
	down
fi
