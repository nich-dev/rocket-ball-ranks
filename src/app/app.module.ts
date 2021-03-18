import { UpdateRankButtonComponent } from './update-rank-button/update-rank-button.component'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { RankBadgeComponent } from './rank-badge/rank-badge.component'
import { FourOhThreePageComponent } from './403-page/403-page.component'
import { RankFilterComponent } from './rank-filter/rank-filter.component'
import { AppHeaderComponent } from './app-header/app-header.component'
import { RankTableComponent } from './rank-table/rank-table.component'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatTableModule } from '@angular/material/table'
import { MatInputModule  } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSortModule } from '@angular/material/sort'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatListModule } from '@angular/material/list'
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { AngularFirestoreModule, USE_EMULATOR } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { LoginPageComponent } from './login-page/login-page.component'
import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions'

const materialModules = [
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatListModule,
  MatTooltipModule,
  MatSortModule,
]

const appModules = [
  RankTableComponent,
  RankFilterComponent,
  AppHeaderComponent,
  LoginPageComponent,
  FourOhThreePageComponent,
  RankBadgeComponent,
  AdminPageComponent,
  UpdateRankButtonComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ...appModules
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    ...materialModules,
  ],
  providers: [
    { provide: USE_EMULATOR, useValue: ['localhost', 8080] },
    { provide: ORIGIN, useValue: 'http://localhost:5001' }
    // { provide: ORIGIN, useValue: 'https://rocketballranks.web.app' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
