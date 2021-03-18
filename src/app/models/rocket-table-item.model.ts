import { Tier, Division, PlaylistMode } from './rocket-mode.model'

export interface RocketTableRank {
    tier: Tier
    division: Division
    rank: number
    mode: PlaylistMode
}

export interface RocketTableItem {
    accountNickName: string
    id: string
    playerName?: string
    secondaryName?: string
    notes?: string
    camera?: string
    unrankedRank?: RocketTableRank
    duelRank?: RocketTableRank
    doublesRank?: RocketTableRank
    standardRank?: RocketTableRank
    hoopsRank?: RocketTableRank
    rumbleRank?: RocketTableRank
    dropshotRank?: RocketTableRank
    timestamp?: number
}
