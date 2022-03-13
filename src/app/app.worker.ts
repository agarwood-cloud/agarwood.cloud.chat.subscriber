/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const notification = new Notification('Hello from WebWorker', {
    body: 'Hello from WebWorker',
  });

  new Notification('Hi there!----');

  const response = `worker response to ${data}`;
  postMessage(response);
});
