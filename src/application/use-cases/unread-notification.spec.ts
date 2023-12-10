import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notificarion';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  test('It should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificaion = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotificaion.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  test('It should be able to unread a nom existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificaion = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotificaion.execute({
        notificationId: 'fake-notificaton-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
