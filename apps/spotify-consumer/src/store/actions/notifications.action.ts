import { NotificationsAction, Notification } from '../../types';
import { ActionTypes } from '../constants/action-types';

export const addNotificationAction = (
  notification: Notification
): NotificationsAction => ({
  type: ActionTypes.ADD_NOTIFICATION,
  notification,
});

export const removeNotificationAction = (
  notificationId: string | number
): NotificationsAction => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  notificationId,
});
