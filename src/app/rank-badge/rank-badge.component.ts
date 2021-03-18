import { Component, Input, OnInit } from '@angular/core'
import { RocketTableRank } from '../models/rocket-table-item.model'
import { RomanNumeralMatches } from '../models/util.model'

@Component({
    selector: 'rank-badge',
    templateUrl: 'rank-badge.component.html',
    styleUrls: ['rank-badge.component.scss']
})
export class RankBadgeComponent implements OnInit {
    @Input() rank: RocketTableRank

    class: string
    rankText: string
    mobileRankText: string

    ngOnInit(): void {
        this.applyTierBackgroundColor()
        this.applyRankText()
        this.applyMobileRankText()
    }

    private applyRankText(): void {
        this.rankText = `${this.rank.tier.name} ${this.rank.division.name} (${this.rank.rank})`
    }

    private applyMobileRankText(): void {
        this.mobileRankText = `${this.minifyRankText(this.rank.tier.name)} (${this.rank.rank})`
    }

    private applyTierBackgroundColor(): void {
        switch (this.rank.tier.id) {
            case 0:
                this.class = 'unranked'
                break
            case 1:
            case 2:
            case 3:
                this.class = 'bronze'
                break
            case 4:
            case 5:
            case 6:
                this.class = 'silver'
                break
            case 7:
            case 8:
            case 9:
                this.class = 'gold'
                break
            case 10:
            case 11:
            case 12:
                this.class = 'platinum'
                break
            case 13:
            case 14:
            case 15:
                this.class = 'diamond'
                break
            case 16:
            case 17:
            case 18:
                this.class = 'champion'
                break
            case 19:
            case 20:
            case 21:
                this.class = 'grand-chamion'
                break
            default:
                this.class = 'supersonic'
                break
        }
    }

    private minifyRankText(input: string): string {
        const splitInput = input.split(' ')
        if (splitInput.length < 2) {
            return input.slice(0, 1)
        }
        const divisionMatch = RomanNumeralMatches[splitInput[1]]
        return `${splitInput[0].slice(0, 1)}${divisionMatch}`
    }
}
