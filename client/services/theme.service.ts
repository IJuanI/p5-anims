import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'platform' })
export class ThemeService {
  private _dark: boolean;

  private _darkTheme = new Subject<boolean>();

  isDarkTheme = this._darkTheme.asObservable();

  constructor() {
    this._darkTheme.subscribe((dark: boolean) => (this._dark = dark));
    const localTheme = localStorage.getItem('theme');
    if (localTheme)
      this.setDarkTheme(localTheme === 'dark');
  }

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
    localStorage.setItem('theme', `${isDarkTheme ? 'dark' : 'light'}`);
  }

  getDarkTheme(): boolean {
    return this._dark;
  }

}
