import DreamsMessageHandler from '../src/messageHandler';

describe('#onMessage', () => {
  describe('when message is not of expected type', () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe);
      const spy = jest.spyOn(global.console, 'warn');
      const message = { data: JSON.stringify({ foo: 'bar' }) };
      handler.onMessage(message)
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when message is onIdTokenDidExpire', () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe);
      const spy = jest.spyOn(global.console, 'warn');
      const message = { data: JSON.stringify({ foo: 'bar' }) };
      handler.onMessage(message)
      expect(spy).toHaveBeenCalled();
    });
    // test("logs that in the console", () => {
    //   window.document.body.innerHTML = `
    //     <div id="div">
    //     <iframe name="dreams-iframe" src="" dreams-data-id="dreams-iframe"> </iframe>
    //     <div>`;
    //   const iframe = document.querySelector('iframe');
    //   const messageHandler = new DreamsMessageHandler(iframe);
    //   const spy = jest.spyOn(messageHandler, 'onMessage');
    //   const event = new Event('message', {});
    //   console.log("iframe: ", iframe);
    //   window.addEventListener("message", messageHandler.onMessage);
    //   iframe.contentWindow.postMessage({ data: 'test'}, '*');

    //   expect(spy).toHaveBeenCalled();

    //   // const instanceMock = jest.spyOn(eventModule, "instance");
    //   // document.addEventListener = jest.fn().mockImplementationOnce((_, callback) => callback());
    //   // eventModule.init();
    //   // expect(document.addEventListener).toBeCalledWith(
    //   //   "DOMContentLoaded",
    //   //   expect.any(Function)
    //   // );
    //   // expect(instanceMock).toBeCalledTimes(1);
    // });
  });
});
