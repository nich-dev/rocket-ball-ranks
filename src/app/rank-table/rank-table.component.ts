import { Tier } from './../models/rocket-mode.model'
import { Account } from './../models/rocket-account.model'
import { RankService } from './../services/rank.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { RocketTableItem, RocketTableRank } from '../models/rocket-table-item.model'
import { RankFilterEvent } from '../rank-filter/rank-filter.component'
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSort, Sort } from '@angular/material/sort'

@Component({
    selector: 'rank-table',
    templateUrl: 'rank-table.component.html',
    styleUrls: ['rank-table.component.scss']
})
export class RankTableComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort

    private defaultPlaylistColumns = ['doubles', 'standard']
    private extraPlaylistColumns = ['casual', 'duel', ...this.defaultPlaylistColumns, 'hoops', 'rumble', 'dropshot']
    private nameColumns = ['nickname', 'player']
    private defaultColumns = [...this.nameColumns, ...this.defaultPlaylistColumns, 'secondaryName', 'id', 'update']
    private expandedColumns = [...this.nameColumns, ...this.extraPlaylistColumns, 'secondaryName', 'id', 'update']

    accounts: Account[]
    tableItems: RocketTableItem[]
    sortedTableItems: RocketTableItem[]
    allTableItems: RocketTableItem[]
    playerNames: string[]
    displayedColumns: string[]
    defaultSort: Sort = { active: 'player', direction: 'asc' }
    currentSort: Sort = { active: 'player', direction: 'asc' }

    constructor(
        private rankService: RankService,
        private functions: AngularFireFunctions
    ) {}

    ngOnInit(): void {
        this.displayedColumns = this.defaultColumns
        this.rankService.getAccountsWithPlayerData().subscribe((accounts: Account[]) => {
            console.log(accounts)
            this.accounts = accounts
            if (!this.playerNames || this.playerNames.length < 1) { // only once
                this.applyPlayersFromAccounts()
            }
            this.allTableItems = this.accounts.map((account: Account) => {
                return this.rankService.mapAccountToTableItem(account)
            })
            console.log(this.allTableItems)
            this.applyFilter()
        })
    }

    applyPlayersFromAccounts(): void {
        this.playerNames = []
        this.accounts.forEach((account: Account) => {
            const playerName = account.player.name
            if (this.playerNames.indexOf(playerName) < 0) {
                this.playerNames.push(playerName)
            }
        })
    }

    sortData(sort?: Sort): void {
        const data = this.tableItems.concat()
        if (!sort || !sort.active || sort.direction === '') {
            sort = this.currentSort
        }
        this.currentSort = sort
        this.sortedTableItems = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc'
            switch (sort.active) {
              case 'nickname': return compare(a.accountNickName, b.accountNickName, isAsc)
              case 'player': return compare(a.playerName, b.playerName, isAsc)
              case 'secondaryName': return compare(a.secondaryName, b.secondaryName, isAsc)
              case 'casual': return compare(a.unrankedRank ? a.unrankedRank.rank : 0, b.unrankedRank ? b.unrankedRank.rank : 0, isAsc)
              case 'duel': return compare(a.duelRank ? a.duelRank.rank : 0, b.duelRank ? b.duelRank.rank : 0, isAsc)
              case 'doubles': return compare(a.doublesRank ? a.doublesRank.rank : 0, b.doublesRank ? b.doublesRank.rank : 0, isAsc)
              case 'standard': return compare(a.standardRank ? a.standardRank.rank : 0, b.standardRank ? b.standardRank.rank : 0, isAsc)
              case 'hoops': return compare(a.hoopsRank ? a.hoopsRank.rank : 0, b.hoopsRank ? b.hoopsRank.rank : 0, isAsc)
              case 'rumble': return compare(a.rumbleRank ? a.rumbleRank.rank : 0, b.rumbleRank ? b.rumbleRank.rank : 0, isAsc)
              case 'dropshot': return compare(a.dropshotRank ? a.dropshotRank.rank : 0, b.dropshotRank ? b.dropshotRank.rank : 0, isAsc)
              default: return 0
            }
          })
    }

    initialFilter(): void {
        this.displayedColumns = this.defaultColumns
        this.tableItems = this.allTableItems
        this.sortData()
    }

    applyFilter(event?: RankFilterEvent): void {
        if (!event) {
            this.initialFilter()
        } else {
            this.updatePlaylists(event.allPlaylists)
            let rows = this.filterItemsOnPlayers(this.allTableItems, event.players)
            rows = this.filterItemsOnRank(rows, event.rank)
            this.tableItems = rows
            this.sortData()
        }
    }

    updatePlaylists(allPlaylists: boolean): void {
        if (allPlaylists) {
            this.displayedColumns = this.expandedColumns
        } else {
            this.displayedColumns = this.defaultColumns
        }
    }

    filterItemsOnPlayers(items: RocketTableItem[], playerNames: string[]): RocketTableItem[] {
        return items.filter(item => {
            return playerNames.indexOf(item.playerName) > -1
        })
    }

    filterItemsOnRank(items: RocketTableItem[], rankName: string): RocketTableItem[] {
        const onlyDoublesAndStandard = this.displayedColumns.length < 7
        return items.filter(item => {
            if (onlyDoublesAndStandard) {
                return this.nameSelectionMatchesTier(rankName, item.doublesRank)
                || this.nameSelectionMatchesTier(rankName, item.standardRank)
            }
            return this.nameSelectionMatchesTier(rankName, item.duelRank)
            || this.nameSelectionMatchesTier(rankName, item.doublesRank)
            || this.nameSelectionMatchesTier(rankName, item.standardRank)
            || this.nameSelectionMatchesTier(rankName, item.hoopsRank)
            || this.nameSelectionMatchesTier(rankName, item.rumbleRank)
            || this.nameSelectionMatchesTier(rankName, item.dropshotRank)
            || this.nameSelectionMatchesTier(rankName, item.unrankedRank)
        })
    }

    nameSelectionMatchesTier(nameSelection: string, rank: RocketTableRank): boolean {
        if (!rank || !rank.tier) {
            return false
        }
        const tier = rank.tier
        switch (nameSelection) {
            case('All'):
                return true
            case('Supersonic Champion'):
                return tier.id > 21
            case('Grand Champion'):
                return tier.id > 18 && tier.id <= 21
            case('Champion'):
                return tier.id > 15 && tier.id <= 18
            case('Diamond'):
                return tier.id > 12 && tier.id <= 15
            case('Platinum'):
                return tier.id > 9 && tier.id <= 12
            case('Gold'):
                return tier.id > 6 && tier.id <= 9
            case('Silver'):
                return tier.id > 3 && tier.id <= 6
            case('Bronze'):
                return tier.id > 0 && tier.id <= 3
            case('Unranked'):
                return tier.id === 0
            default:
                return false
        }
    }

    updatePlayer(item: RocketTableItem): void{
        console.log('updating ' + item.id)
        const callable = this.functions.httpsCallable('updateRanks')
        callable({ name: item.id}).subscribe((res: any) => {
            console.log(res)
            console.log('updated ' + item.id)
      })
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
