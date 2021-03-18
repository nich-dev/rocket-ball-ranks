import { Injectable } from '@angular/core'
import { Observable, of, combineLatest } from 'rxjs'
import { Account, Playlist, Player, AccountMeta } from '../models/rocket-account.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { RocketTableItem, RocketTableRank } from '../models/rocket-table-item.model'
import { map } from 'rxjs/operators'


@Injectable({
    providedIn: 'root',
})
export class RankService {

    private accountCollection: AngularFirestoreCollection<Account>
    private playerCollection: AngularFirestoreCollection<Player>

    constructor(
        private firestore: AngularFirestore
    ) {
        this.accountCollection = this.firestore.collection<Account>('accounts')
        this.playerCollection = this.firestore.collection<Player>('players')
    }

    getAccounts(): Observable<Account[]> {
        return this.accountCollection.valueChanges()
    }

    getPlayers(): Observable<Player[]> {
        return this.playerCollection.valueChanges()
    }

    getAccountsWithPlayerData(): Observable<Account[]> {
        return combineLatest([this.getAccounts(), this.getPlayers()]).pipe(
            map((res: any[]) => {
                const accounts: Account[] = res[0]
                const players: Player[] = res[1]
                return accounts.map((account: Account) => {
                    let matchingMeta: AccountMeta = null
                    const matchingPlayer = players.find((player: Player) => {
                        return player.accounts.find((accountMeta: AccountMeta) => {
                            const match = accountMeta.id === account.id
                            if (match) {
                                matchingMeta = accountMeta
                            }
                            return match
                        })
                    })
                    account.player = matchingPlayer ? matchingPlayer : null
                    account.meta = matchingMeta
                    return account
                })
            })
        )
    }

    getPlayer(id: string): Observable<Player> {
        return this.firestore.doc<Player>('accounts/' + id).valueChanges()
    }

    mapPlaylistToTableRank(playlist: Playlist): RocketTableRank {
        return {
            tier: { id: playlist.tier, name: playlist.tierName },
            division: { id: playlist.divison, name: playlist.divisionName },
            rank: playlist.rank,
            mode: { id: playlist.id, name: playlist.name }
        }
    }

    mapAccountToTableItem(account: Account): RocketTableItem {
        const item: RocketTableItem = {
            accountNickName: account.username,
            id: account.id,
            timestamp: account.timestamp
        }
        account.playlists.forEach((playlist: Playlist) => {
            const rank = this.mapPlaylistToTableRank(playlist)
            switch (rank.mode.id) {
                case 0: // Un-Ranked
                    item.unrankedRank = rank
                    break
                case 10: // Ranked Duel 1v1
                    item.duelRank = rank
                    break
                case 11: // Ranked Doubles 2v
                    item.doublesRank = rank
                    break
                case 13: // Ranked Standard 3v3
                    item.standardRank = rank
                    break
                case 27: // Hoops
                    item.hoopsRank = rank
                    break
                case 28: // Rumble
                    item.rumbleRank = rank
                    break
                case 29: // Dropshot
                    item.dropshotRank = rank
                    break
                default:
                    break
            }
        })
        if (account.player) {
            item.playerName = account.player.name
            item.camera = account.player.camera
        }
        if (account.meta) {
            item.secondaryName = account.meta.name
            item.notes = account.meta.notes
        }
        return item
    }
}
