import { Subject, switchMap, map, catchError, shareReplay, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export default class Connection {
  constructor(baseUrl) {
    this.url = baseUrl;

    this.requestToServer$ = new Subject().pipe(
      switchMap((value) => value),
      shareReplay(),
    );

    this.requestData();
  }

  async requestData() {
    const response = await this.requestToServer();
    this.requestToServer$.next(response);
  }

  async requestToServer() {
    const response = await ajax.getJSON(`${this.url}/messages/unread`).pipe(
      catchError(() => {
        setTimeout(this.requestData.bind(this), 5000);
        return of(false);
      }),
      map((value) => {
        return value;
      }),
    );
    return response;
  }
}
