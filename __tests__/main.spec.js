import { DreamsSDK } from '../src/main';

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = '';
});

describe('#setup', () => {
  test('creates elements', () => {
    const sdk = new DreamsSDK('http://www.example.com');
    const div = document.createElement('div');
    const callbacks = {};
    div.setAttribute('id', 'id');
    document.body.appendChild(div);

    sdk.setup(callbacks, 'id');

    const form = div.firstChild;
    const formInputLocale = form.firstChild;
    const formInputToken = form.lastChild;

    expect(form.target).toBe('dreams-web-sdk-iframe');
    expect(form.method).toBe('post');
    expect(form.action).toBe('http://www.example.com/users/verify_token');
    expect(form.className).toBe('hidden');
    expect(formInputLocale.type).toBe('hidden');
    expect(formInputLocale.name).toBe('locale');
    expect(formInputLocale.value).toBe('en');
    expect(formInputToken.type).toBe('hidden');
    expect(formInputToken.name).toBe('token');
    expect(formInputToken.value).toBe('');
    expect(sdk.messageHandler).not.toBe(null);
  });
});

describe('#start', () => {
  test('submits the form and listens for events', () => {
    const sdk = new DreamsSDK('url');
    const div = document.createElement('div');

    div.setAttribute('id', 'id');
    document.body.appendChild(div);
    sdk.setup('token', 'id');

    const form = div.firstChild;
    const formSpy = jest.spyOn(form, 'submit')
                    .mockImplementation(() => {});
    const windowSpy = jest.spyOn(window, 'addEventListener');

    sdk.start('token', 'fr');

    const formInputLocale = form.firstChild;
    const formInputToken = form.lastChild;

    expect(formInputLocale.value).toBe('fr');
    expect(formInputToken.value).toBe('token');
    expect(formSpy).toHaveBeenCalled();
    expect(windowSpy).toHaveBeenCalled();
  });


  describe('prerequisites validation', () => {
    test('iframe presence', () => {
      const throwable = () => {
        const sdk = new DreamsSDK('url');
        sdk.start('token');
      }

      expect(throwable).toThrow();
    });

    test('form presence', () => {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe)

      const throwable = () => {
        const sdk = new DreamsSDK('url');
        sdk.iframe = iframe;
        sdk.start('token');
      }

      expect(throwable).toThrow();
    });
  })
});
