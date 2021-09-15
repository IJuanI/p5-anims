import { Component } from '@angular/core';
import { ThemeService } from 'client/services';

@Component({
  selector: 'ceich-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  isDark: boolean;
  checked: boolean;

  constructor(private _theme: ThemeService) {
    this.isDark = _theme.getDarkTheme();
    this.checked = this.isDark;
  }

  nightModeToggle(): void {
    this.isDark = !this.isDark;
    this.checked = this.isDark;
    this._theme.setDarkTheme(this.isDark);
  }

}
