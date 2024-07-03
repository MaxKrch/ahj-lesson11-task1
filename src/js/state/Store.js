import { Subject, scan, shareReplay } from 'rxjs';

export default class Store {
  constructor(state) {
    this.state$ = new Subject().pipe(
      scan((oldState, newState) => {
        if (newState) {
          return newState;
        }
        return oldState;
      }, state.mails),
      shareReplay(),
    );
  }

  update(newState) {
    this.state$.next(newState);
    return newState;
  }
}
