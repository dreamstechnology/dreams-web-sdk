export const iframeName = 'dreams-web-sdk-iframe';

export const createForm = (
  endpoint: string,
  tokenProps = { type: 'hidden', name: 'token', value: '' },
  localeProps = { type: 'hidden', name: 'locale', value: 'en' }
): HTMLFormElement => {
  const form = document.createElement('form');

  form.setAttribute('target', iframeName);
  form.setAttribute('method', 'POST');
  form.setAttribute('action', endpoint);
  form.setAttribute('class', 'hidden');

  const formInputLocale = document.createElement('input');

  formInputLocale.setAttribute('type', localeProps.type);
  formInputLocale.setAttribute('name', localeProps.name);
  formInputLocale.setAttribute('value', localeProps.value);

  const formInputToken = document.createElement('input');

  formInputToken.setAttribute('type', tokenProps.type);
  formInputToken.setAttribute('name', tokenProps.name);
  formInputToken.setAttribute('value', tokenProps.value);

  form.appendChild(formInputLocale);
  form.appendChild(formInputToken);

  return form;
};

export const createIFrame = (className = 'dreams-web-sdk-iframe'): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('name', iframeName);
  iframe.setAttribute('class', className);

  return iframe;
};

export default {
  createForm,
  createIFrame,
  iframeName,
};
