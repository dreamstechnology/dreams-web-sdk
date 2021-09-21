import MessageHandler, { ClientCallbacks } from "./messageHandler";
import { createForm, createIFrame, iframeName } from './util';

const setup = (id: string, verifyTokenUrl: string, token: string) => {
  const containerId = id || "dreams-web-sdk-container";
  const dreamdDiv = document.getElementById(containerId);

  if (!dreamdDiv) {
    throw "can't find dreams web sdk container";
  }

  const form = createForm(verifyTokenUrl, token);
  const iframe = createIFrame();

  dreamdDiv.appendChild(form);
  dreamdDiv.appendChild(iframe);

  form.submit();
}

const getMessageHandler = (
  dreamsApiUrl: string,
  exitDreamsUrl: string,
  callbacks: ClientCallbacks
): MessageHandler => {
  const iframe = document.getElementsByName(iframeName)[0] as HTMLIFrameElement;

  return new MessageHandler(iframe, callbacks, dreamsApiUrl, exitDreamsUrl);
}

export default {
  getMessageHandler,
  MessageHandler,
  setup,
}
