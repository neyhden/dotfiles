#!/bin/bash

BRIGHTNESS_FILE=/sys/class/backlight/intel_backlight/brightness
MAX_BRIGHTNESS_FILE=/sys/class/backlight/intel_backlight/max_brightness

VOLUME_FILE=./vol.txt

while [[ $# -gt 0 ]]; do
    case "$1" in
        "brightness")
            while true; do
                echo "$(( $(cat $BRIGHTNESS_FILE) * 100 / $(cat $MAX_BRIGHTNESS_FILE) ))"
                inotifywait -q -e MODIFY $BRIGHTNESS_FILE > /dev/null
            done
            exit 0
            ;;
        "volume")
            pactl subscribe | grep 'change' > /tmp/tmpshitfileunused &
            SUB_PS=$!
            while true; do
                echo "$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | cut -c 11-12)"
                inotifywait -q /proc/${SUB_PS}/fd/0 > /dev/null
            done
            ;;
        "muted")
            pactl subscribe | grep 'change' > /tmp/tmpshitfileunused &
            SUB_PS=$!
            while true; do
                echo "$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | grep 'MUTED')"
                inotifywait -q /proc/${SUB_PS}/fd/0 > /dev/null
            done
            ;;
        "listenfile")
            while true; do
                inotifywait -q -e MODIFY "$2" > /dev/null
                cat "$2"
            done
            exit 0
            ;;
        "bup")
            brightnessctl set 5%+
            exit 0
            ;;
        *) echo "not a command"
            shift
            ;;
    esac
done

exit 1
