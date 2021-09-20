import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar';
import { AutoMenuModule } from './custom';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./routes/app').then(m => m.AppModule) },
  { path: 'coulomb', loadChildren: () => import('./routes/coulomb').then(m => m.CoulombModule) }
];
@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    AutoMenuModule,
    MatMenuModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
