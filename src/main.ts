import DreamsMessageHandler from "./messageHandler";

document.addEventListener("DOMContentLoaded", () => {
  console.log('------dom content loaded')
  const dreamsIframe = document.querySelector("iframe[dreams-data-id=dreams-iframe]") as HTMLIFrameElement;
  console.log("dreams iframe found: ", dreamsIframe);
  const messageHandler = new DreamsMessageHandler(dreamsIframe);
  console.log("registering addevent")
  window.addEventListener("message", messageHandler.onMessage)

  const dreamsForm = document.querySelector("input[dreams-data-id=dreams-messages-form]") as HTMLFormElement;

  if (dreamsForm) dreamsForm.submit();
});

