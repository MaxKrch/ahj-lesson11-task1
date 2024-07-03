import { timer } from 'rxjs';

import Render from './ui/Render';
import Store from './state/Store';
import Connection from './api/Connection';

import { BASE_OPTIONS } from './state/Options.js';

const widget = new Render('#app');
const store = new Store(BASE_OPTIONS.INITIAL_STATE);
const connection = new Connection(BASE_OPTIONS.URL_SERVER);

widget.renderWidget();

const requestUpdate$ = timer(2500, 25000);
const subsForUpdate = requestUpdate$.subscribe({
  next: () => connection.requestData(),
});

const subsOnResponseServ = connection.requestToServer$.subscribe({
  next: (value) => store.update.call(store, value),
});

const subsOnUpdateState = store.state$.subscribe({
  next: (state) => widget.update.call(widget, state),
});

window.onunload = () => {
  subsForUpdate.unsubscribe();
  subsOnResponseServ.unsubscribe();
  subsOnUpdateState.unsubscribe();
};
