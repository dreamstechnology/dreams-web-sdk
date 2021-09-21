export const iframeName = 'dreams-web-sdk-iframe';

export const createForm = (endpoint, token): HTMLFormElement => {
  const form = document.createElement('form');

  form.setAttribute('target', iframeName);
  form.setAttribute('method', 'POST');
  form.setAttribute('action', endpoint);
  form.setAttribute('class', 'hidden');

  const inputLocale = document.createElement('input');

  inputLocale.setAttribute('type', 'hidden');
  inputLocale.setAttribute('name', 'locale');
  inputLocale.setAttribute('value', 'en');

  const inputToken = document.createElement('input');

  inputToken.setAttribute('type', 'hidden');
  inputToken.setAttribute('name', 'token');
  inputToken.setAttribute('value', token);

  form.appendChild(inputLocale);
  form.appendChild(inputToken);

  return form;
}

export const createIFrame = (): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('name', iframeName);
  iframe.setAttribute('class', 'h-full w-full overflow-hidden');

  return iframe;
}

export default {
  createForm,
  createIFrame,
  iframeName
}
