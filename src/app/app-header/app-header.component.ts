import { ThemeService } from './../services/theme.service';
import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { Router } from '@angular/router'
import firebase from 'firebase/app'

@Component({
    selector: 'app-header',
    templateUrl: 'app-header.component.html',
    styleUrls: ['app-header.component.scss']
})
export class AppHeaderComponent {

    darkModeActive: boolean

    constructor(
        public auth: AngularFireAuth,
        public router: Router,
        public themeService: ThemeService
    ) {
        this.darkModeActive = themeService.currentActive() === 'dark'
    }

    logout(): void {
        this.auth.signOut()
        this.router.navigateByUrl('/')
    }

    themeChanged(event: MatSlideToggleChange): void {
        if (event.checked) {
            this.themeService.update('dark')
        } else {
            this.themeService.update('light')
        }
    }
}
