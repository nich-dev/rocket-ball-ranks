export const RocketRankTierOption = [
    { id: 99, name: 'All' },
    { id: 22, name: 'Supersonic Champion' },
    { id: 21, name: 'Grand Champion' },
    { id: 18, name: 'Champion' },
    { id: 15, name: 'Diamond' },
    { id: 12, name: 'Platinum' },
    { id: 9,  name: 'Gold' },
    { id: 6,  name: 'Silver' },
    { id: 3,  name: 'Bronze' },
    { id: 0,  name: 'Unranked' },
]

export interface PlaylistMode {
    id: number
    name: string
}

export const PlaylistModes: PlaylistMode[] = [
    { id: 0, name: 'Un-Ranked' },
    { id: 10, name: 'Ranked Duel 1v1' },
    { id: 11, name: 'Ranked Doubles 2v2' },
    { id: 13, name: 'Ranked Standard 3v3' },
    { id: 27, name: 'Hoops' },
    { id: 28, name: 'Rumble' },
    { id: 29, name: 'Dropshot' }
]

export interface Division {
    id: number
    name: string
}

export const Divisions: Division[] = [
    { id: 0, name: 'Division I' },
    { id: 1, name: 'Division II' },
    { id: 2, name: 'Division III' },
    { id: 3, name: 'Division IV' }
]

export interface Tier {
    id: number
    name: string
}

export const Tiers: Tier[] = [
    { id: 0, name: 'Unranked' },
    { id: 1, name: 'Bronze I' },
    { id: 2, name: 'Bronze II' },
    { id: 3, name: 'Bronze III' },
    { id: 4, name: 'Silver I' },
    { id: 5, name: 'Silver II' },
    { id: 6, name: 'Silver III' },
    { id: 7, name: 'Gold I' },
    { id: 8, name: 'Gold II' },
    { id: 9, name: 'Gold III' },
    { id: 10, name: 'Platinum I' },
    { id: 11, name: 'Platinum II' },
    { id: 12, name: 'Platinum III' },
    { id: 13, name: 'Diamond I' },
    { id: 14, name: 'Diamond II' },
    { id: 15, name: 'Diamond III' },
    { id: 16, name: 'Champion I' },
    { id: 17, name: 'Champion II' },
    { id: 18, name: 'Champion III' },
    { id: 19, name: 'Grand Champion I' },
    { id: 20, name: 'Grand Champion II' },
    { id: 21, name: 'Grand Champion III' },
    { id: 22, name: 'Supersonic Legend' }
]
