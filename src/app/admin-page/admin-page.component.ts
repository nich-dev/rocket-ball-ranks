import { RankService } from './../services/rank.service'
import { Component, OnInit } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { Player } from '../models/rocket-account.model'

@Component({
    selector: 'admin-page',
    templateUrl: 'admin-page.component.html',
    styleUrls: ['admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    players: Player[]

    constructor(
        private functions: AngularFireFunctions,
        private rankService: RankService
    ) { }

    ngOnInit(): void {
        this.rankService.getPlayers().subscribe(players => {
            this.players = players
        })
    }

    updateRanksFor(id: string): void {
        console.log('updating ' + id)
        const callable = this.functions.httpsCallable('updateRanks')
        callable({ name: id}).subscribe((res: any) => {
            console.log(res)
            console.log('updated ' + id)
      })
    }
}
