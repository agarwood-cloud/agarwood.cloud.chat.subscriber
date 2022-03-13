import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'chat';
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');

  Notification.requestPermission( (permission: NotificationPermission) => {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      worker.postMessage("hi new notification!")
    }
  }).then(r => console.info(`permission = ${r}`))
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
