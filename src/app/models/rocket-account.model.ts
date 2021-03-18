export interface AccountMeta {
    id: string
    name: string
    notes: string
}

export interface Player {
    name: string
    camera: string
    accounts: Array<AccountMeta>
}

export interface Account {
    id: string
    username: string
    avatar: string
    playlists: Playlist[]
    timestamp?: number
    player?: Player
    meta?: AccountMeta
}

export interface Playlist {
    id: number
    name: string
    rank: number
    tierName: string
    tier: number
    divisionName: string
    divison: number
}
