import { RocketRankTierOption } from './../models/rocket-mode.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import firebase from 'firebase/app'
import { AngularFireFunctions } from '@angular/fire/functions'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'

export interface RankFilterEvent {
    players: Array<string>
    rank: string
    allPlaylists: boolean
}

@Component({
    selector: 'rank-filter',
    templateUrl: 'rank-filter.component.html',
    styleUrls: ['rank-filter.component.scss']
})
export class RankFilterComponent implements OnInit {
    @Output() filter = new EventEmitter<RankFilterEvent>()
    @Input() players: Array<string>

    tier = 'All'
    tierOptions = RocketRankTierOption
    playerSelections = []
    allPlaylistsToggle = false

    ngOnInit(): void {
        this.playerSelections = this.players.concat()
    }

    playersChanged(event: string): void {
        if (this.playerSelections.indexOf(event) > -1) {
            this.playerSelections = this.playerSelections.filter(n => n !== event)
        } else {
            this.playerSelections.push(event)
        }
        this.dispatch()
    }

    playlistsSliderChanged(event: any): void {
        this.allPlaylistsToggle = event.checked
        this.dispatch()
    }

    dispatch(): void {
        this.filter.emit({
            players: this.playerSelections,
            rank: this.tier,
            allPlaylists: this.allPlaylistsToggle
        })
    }
}
