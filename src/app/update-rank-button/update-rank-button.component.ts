import { RocketTableItem } from './../models/rocket-table-item.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
    selector: 'update-rank-button',
    templateUrl: 'update-rank-button.component.html',
    styleUrls: ['update-rank-button.component.scss']
})
export class UpdateRankButtonComponent implements OnInit{
    @Input() item: RocketTableItem
    @Output() clicked = new EventEmitter<any>()

    buttonDisabled = true
    tooltipText = UPDATE_NOTALLOWED_TIP

    ngOnInit(): void {
        if (this.item.timestamp) {
            const timeDiff = new Date().getTime() - this.item.timestamp
            if (timeDiff > TIME_DIFF_ALLOWED) {
                this.buttonDisabled = false
                const minutesAgo = Math.floor(timeDiff / 60000)
                if (minutesAgo > 2880) {
                    this.tooltipText = `${UPDATE_TIP} ${Math.floor(minutesAgo / 1440)} days ago`
                } else if (minutesAgo > 90) {
                    this.tooltipText = `${UPDATE_TIP} ${Math.floor(minutesAgo / 60)} hours ago`
                } else {
                    this.tooltipText = `${UPDATE_TIP} ${minutesAgo} minutes ago`
                }
            } else {
                this.buttonDisabled = true
                const inMinutes = Math.floor((TIME_DIFF_ALLOWED - timeDiff) / 60000)
                if (inMinutes > 60) {
                    this.tooltipText = `Next update available in ${Math.floor(inMinutes / 60)} hours`
                } else {
                    this.tooltipText = `Next update available in ${inMinutes} minutes`
                }
            }
        }
    }

    updateClicked(event: any): void {
        if (!this.buttonDisabled) {
            this.clicked.emit(this.item)
            this.buttonDisabled = true
        }
    }
}

export const UPDATE_NOTALLOWED_TIP = 'Update not allowed'

export const UPDATE_TIP = 'Last update was'

export const TIME_DIFF_ALLOWED = 24400000
