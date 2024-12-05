import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

export const LOCATION_TASK_NAME = "background-location-task";

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number;
    heading: number;
    speed: number;
  };
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data as { locations: LocationData[] };
    // do something with the locations captured in the background

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Location Update",
        body: `Lat: ${locations[0].coords.latitude}, Lng: ${locations[0].coords.longitude}`,
        sound: true,
        // channelId: 'location-updates',
      },
      trigger: null, // Immediate notification
    });
  }
});
