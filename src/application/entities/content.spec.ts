import { Content } from './content';

describe('Notification content', () => {
  test('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade.');

    expect(content).toBeTruthy();
  });

  test('it should not be able to create a notification content with less than 5 caracters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  test('it should not be able to create a notification content with more than 450 caracters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
