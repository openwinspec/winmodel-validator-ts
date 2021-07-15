import { greet } from './hello-world';

test('greeting', () => {
  expect(greet('Foo')).toBe('Hello Foo');
});
