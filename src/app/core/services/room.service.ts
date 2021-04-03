import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}

  fetchRoomsList(): Observable<any> {
    const roomPayload = localStorage.getItem('roomList');
    const list = roomPayload ? JSON.parse(roomPayload) : [];
    if (list && list.length > 0) {
      return of(list);
    } else {
      return this.httpClient.get<any>('/assets/rooms.json');
    }
  }

  updateRooms(level: string, rooms: any): Observable<any> {
    const roomPayload = localStorage.getItem('roomList');
    const list = roomPayload ? JSON.parse(roomPayload) : [];
    if (list && list.length > 0) {
      this.updateOpt(list, level, rooms);
      return of(true);
    } else {
      return this.httpClient.get<any>('/assets/rooms.json').pipe(
        switchMap((listOrg: any[]) => {
          this.updateOpt(listOrg, level, rooms);
          return of(true);
        })
      );
    }
  }

  private updateOpt(list: any[], level: string, rooms: any) {
    const roomsListIndex = list.findIndex(l => l.level === level);
    console.log(roomsListIndex);
    list[roomsListIndex].rooms = list[roomsListIndex].rooms.map(room => {
      if (room.roomNo.toString() === rooms.roomNo.toString()) {
        room.occupied = !room.occupied;
      }
      return room;
    });
    localStorage.setItem('roomList', JSON.stringify(list));
  }
}
