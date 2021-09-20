import { Injectable } from '@angular/core';
import { ThemeService } from './theme.service';

@Injectable({ providedIn: 'platform' })
export class ColorService {
  private dark: boolean;

  private _black = '#000';
  private _white = '#fff';
  private _red = '#e44a4a';
  private _purple = '#b83bd1';
  private _blue = '#4a6ee4';


  constructor(theme: ThemeService) {
    this.dark = theme.getDarkTheme();
    theme.isDarkTheme.subscribe((dark: boolean) => (this.dark = dark));
  }

  public get black(): string { return this.dark ? this._white : this._black; }
  public get white(): string { return this.dark ? this._black : this._white; }
  public get red(): string { return this._red; }
  public get purple(): string { return this._purple; }
  public get blue(): string { return this._blue; }

}
