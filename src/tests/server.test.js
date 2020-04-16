import { listening } from '../server/server';

describe('server', () => {
  test('listening should be defined', () => {
    expect(listening).toBeDefined();
  });
});