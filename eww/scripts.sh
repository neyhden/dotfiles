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
        "touchpad")
            TOUCHPAD_PATH=/tmp/touchpad_off
            if [ -f $TOUCHPAD_PATH ]; then
                rm $TOUCHPAD_PATH
                hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' true
            else
                touch $TOUCHPAD_PATH
                hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' false
            fi
            exit 0
            ;;
        "hyprland")
            WORKSPACES=$(hyprctl workspaces -j)
            ACTIVE=$(hyprctl activeworkspace -j | jq ".id")
            HYPRLAND="[]"
            I=0
            while [ $I -le 10 ]; do
                EXISTS=$(echo $WORKSPACES | grep -q "\"id\": ${I}" && echo true || echo false)
                ISACTIVE=$( [ $ACTIVE = $I ] && echo true || echo false )
                HYPRLAND=$(echo $HYPRLAND | jq -c ". += [{id: ${I}, exists: ${EXISTS}, active: ${ISACTIVE}}]")
                I=$((I + 1))
            done
            echo $HYPRLAND
            exit 0
            ;;
        *) echo "not a command"
            exit 1
            ;;
    esac
done

exit 1
