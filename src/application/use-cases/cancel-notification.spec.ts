import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notificarion';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  test('It should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotificarion = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotificarion.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('It should be able to cancel a nom existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotificarion = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotificarion.execute({
        notificationId: 'fake-notificaton-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
