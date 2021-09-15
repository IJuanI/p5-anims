import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { ThemeService } from 'client/services';

@Component({
  selector: 'ceich-root',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  isDark: boolean;

  constructor(
    theme: ThemeService,
    private overlayContainer: OverlayContainer) {
    this.updateTheme(theme.getDarkTheme());
    theme.isDarkTheme.subscribe(this.updateTheme.bind(this));
  }

  @HostBinding('class.dark') get dark(): boolean { return this.isDark; }

  private updateTheme(dark: boolean): void {
    const cdkElement = this.overlayContainer.getContainerElement();
    if (dark) cdkElement.classList.add('dark');
    else cdkElement.classList.remove('dark');

    this.isDark = dark;
  }
}
