TOUCHPAD_FILE=/tmp/touchpad_state

if [ ! -f $TOUCHPAD_FILE ]; then
  touch $TOUCHPAD_FILE
  echo "on" > $TOUCHPAD_FILE
  hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' true
  exit 0
fi

TOUCHPAD_STATE=$(cat $TOUCHPAD_FILE)
if [ $TOUCHPAD_STATE = "on" ]; then
  hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' false
  echo "off" > $TOUCHPAD_FILE
else
  hyprctl keyword 'device[cust0001:00-04f3:30fa-touchpad]:enabled' true
  echo "on" > $TOUCHPAD_FILE
fi

