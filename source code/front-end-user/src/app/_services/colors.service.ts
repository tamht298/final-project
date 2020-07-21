import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }

  public getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
