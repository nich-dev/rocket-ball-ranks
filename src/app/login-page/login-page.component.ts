import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import firebase from 'firebase/app'

@Component({
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.scss']
})
export class LoginPageComponent {
    constructor(
        public auth: AngularFireAuth,
        public router: Router
    ) { }

    login(): void {
        this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
}
