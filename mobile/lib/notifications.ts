import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getDailyTeaser } from './quiz-data';

// Configure how notifications appear when the app is in the foreground
if (Device.isDevice) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
}

// Request permissions and get push token
export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Push notification permission not granted');
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-teaser', {
      name: 'Daily AI Teaser',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#a855f7',
    });
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

// Schedule the daily teaser notification
export async function scheduleDailyTeaser(): Promise<void> {
  if (!Device.isDevice) {
    console.log('Skipping notification scheduling on simulator');
    return;
  }

  // Cancel any existing daily teaser notifications
  await cancelDailyTeaser();

  const teaser = getDailyTeaser();

  // Schedule for 9:00 AM daily
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily AI Teaser',
      body: teaser.fact,
      data: { type: 'teaser', category: teaser.category },
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 0,
    },
  });

  console.log('Daily teaser notification scheduled');
}

// Cancel all daily teaser notifications
export async function cancelDailyTeaser(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notification of scheduled) {
    if (notification.content.data?.type === 'teaser') {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}

// Add notification response listener (when user taps a notification)
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

// Add notification received listener (when notification arrives in foreground)
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(callback);
}
