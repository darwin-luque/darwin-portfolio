// Disabling this rule on reducer because is required to provide default
// value for state and its the first param redux is expecting
/* eslint-disable @typescript-eslint/default-param-last */
import { NotificationsState, NotificationsAction } from '../../types';
import { updateObject } from '../../../utils';
import { ActionTypes } from '../constants/action-types';

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsReducer = (
  state = initialState,
  action: NotificationsAction
): NotificationsState => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return updateObject(state, {
        notifications: [...state.notifications, action.notification!],
      });
    case ActionTypes.REMOVE_NOTIFICATION:
      return updateObject(state, {
        notifications: state.notifications.filter(
          ({ id }) => id !== action.notificationId!
        ),
      });
    default:
      return state;
  }
};

export default notificationsReducer;
