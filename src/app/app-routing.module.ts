import { AdminPageComponent } from './admin-page/admin-page.component'
import { RankTableComponent } from './rank-table/rank-table.component'
import { FourOhThreePageComponent } from './403-page/403-page.component'
import { AppComponent } from './app.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginPageComponent } from './login-page/login-page.component'
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'
import { pipe } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { customClaims } from '@angular/fire/auth-guard'

const redirectUnauthorizedToMustard = () => redirectUnauthorizedTo(['stiff-mustard'])
const redirectToRanks = () => redirectLoggedInTo(['ranks'])
const cowsOnly = () => pipe(
  customClaims,
  map(claims => claims.isCow === true )
)
const adminOnly = () => pipe(
  customClaims,
  map(claims => claims.admin === true )
)

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToRanks }
  },
  {
    path: 'ranks',
    component: RankTableComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: cowsOnly }
  },
  {
    path: 'stiff-mustard',
    component: FourOhThreePageComponent,
  },
  {
    path: 'extra-limp',
    component: AdminPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
