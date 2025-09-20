#!/bin/bash

BRIGHTNESS_FILE=/sys/class/backlight/intel_backlight/brightness
MAX_BRIGHTNESS_FILE=/sys/class/backlight/intel_backlight/max_brightness

TOUCHPAD_FILE=/tmp/touchpad_state
VOLUME_FILE=./vol.txt

while [[ $# -gt 0 ]]; do
    case "$1" in
        "touchpad")
            if [ ! -f $TOUCHPAD_FILE ]; then
                touch $TOUCHPAD_FILE
                echo "on" > $TOUCHPAD_FILE
            fi
            while true; do
                cat $TOUCHPAD_FILE
                inotifywait -q $TOUCHPAD_FILE > /dev/null
            done
            exit 0
            ;;
        "brightness")
            while true; do
                echo "$(( $(cat $BRIGHTNESS_FILE) * 100 / $(cat $MAX_BRIGHTNESS_FILE) ))"
                inotifywait -q -e MODIFY $BRIGHTNESS_FILE > /dev/null
            done
            exit 0
            ;;
        "volume")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SINK@ | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//")
            pactl subscribe \
              | grep --line-buffered "Event 'change' on sink " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SINK@ \
                  | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//"
            done
            ;;
        "muted")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SINK@ | grep -c MUTED)
            pactl subscribe \
              | grep --line-buffered "Event 'change' on sink " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SINK@ | grep -c MUTED;
            done
            ;;
        "mic-volume")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//")
            pactl subscribe \
              | grep --line-buffered "Event 'change' on source " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SOURCE@ \
                  | cut -d ' ' -f 2 | sed "s/0\\.\\|\\.\\|0\\.0//"
            done
            ;;
        "mic-muted")
            echo $(wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | grep -c MUTED)
            pactl subscribe \
              | grep --line-buffered "Event 'change' on source " \
              | while read -r evt; 
              do wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | grep -c MUTED;
            done
            ;;
        "toggle-touchpad")
            TOUCHPAD_STATE=$(cat $TOUCHPAD_FILE)
            if [ $TOUCHPAD_STATE = "on" ]; then
                hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' false
                echo "off" > $TOUCHPAD_FILE
            else
                hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' true
                echo "on" > $TOUCHPAD_FILE
            fi
            exit 0
            ;;
        "hyprland")
            WORKSPACES=$(hyprctl workspaces -j)
            ACTIVE=$(hyprctl activeworkspace -j | jq ".id")
            HYPRLAND="{\"active\": $ACTIVE, \"workspaces\": []}"
            I=1
            while [ $I -le 10 ]; do
                EXISTS=$(echo $WORKSPACES | grep -q "\"id\": ${I}" && echo true || echo false)
                W="{\"id\": ${I}, \"exists\": ${EXISTS}, \"urgent\": false}"
                HYPRLAND=$(echo $HYPRLAND | jq -c ".workspaces += [$W]")
                I=$((I + 1))
            done
            echo $HYPRLAND

            handle() {
                case $1 in
                    workspace\>\>*)
                        W=$(echo $1 | grep -o "[0-9]*")
                        HYPRLAND=$(echo $HYPRLAND | jq -c ".active = $W | .workspaces[$W - 1].exists = true | .workspaces[$W - 1].urgent = false")
                        echo "$HYPRLAND"
                        ;;
                    focusedmon\>\>*)
                        W=$(echo $1 | cut -d ',' -f 2 | grep -o "[0-9]*")
                        HYPRLAND=$(echo $HYPRLAND | jq -c ".active = $W" | jq -c ".workspaces[$(($W-1))].exists = true")
                        echo "$HYPRLAND"
                        ;;
                    destroyworkspace\>\>*)
                        W=$(echo $1 | grep -o "[0-9]*")
                        HYPRLAND=$(echo $HYPRLAND | jq -c ".workspaces[$(($W - 1))].exists = false")
                        echo "$HYPRLAND"
                        ;;
                    urgent\>\>*)
                        ADDR=$(echo $1 | cut -d '>' -f 3)
                        W=$(hyprctl clients -j | jq -c ".[] | select(.address == \"0x${ADDR}\") | .workspace.id")
                        if [ $(echo $HYPRLAND | jq -c ".active") != $W ]; then
                            HYPRLAND=$(echo $HYPRLAND | jq -c ".workspaces[$W - 1].urgent = true")
                        fi
                        echo $HYPRLAND
                        ;;
                    *)
                        ;;
                esac
            }

            socat -U - UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; do handle "$line"; done
            ;;

        *) echo "not a command"
            exit 1
            ;;
    esac
done

exit 1
