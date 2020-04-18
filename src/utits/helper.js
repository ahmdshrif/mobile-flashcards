
import { Vibration, Platform, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const NOTIFICATION_KEY = 'flashcards:notifications'


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'start quize !',
        body: " don't forget to solve your quiz for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    if (Constants.isDevice) {
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data) => {
                if (data == null) {
                    Permissions.askAsync(Permissions.NOTIFICATIONS)
                        .then(({ status }) => {
                            if (status === 'granted') {
                                Notifications.cancelAllScheduledNotificationsAsync()

                                let tomorrow = new Date()
                                tomorrow.setDate(tomorrow.getDate() + 1)
                                tomorrow.setHours(8)
                                tomorrow.setMinutes(0)

                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                        time: tomorrow,
                                        repeat: 'day',
                                    }
                                )
                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                            }
                        })
                }
            })
    } else {
        alert('Must use physical device for  Notifications');

    }
}