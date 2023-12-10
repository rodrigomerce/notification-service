import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notificarion';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  test('It should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotificaion = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotificaion.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('It should be able to read a nom existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotificaion = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotificaion.execute({
        notificationId: 'fake-notificaton-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
