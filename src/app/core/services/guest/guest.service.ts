import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  constructor(private httpClient: HttpClient) {}

  fetchGuestList(): Observable<any> {
    return this.httpClient.get<any>('/assets/guests.json');
  }
}
