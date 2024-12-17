export type pokemonModel = {
    id: string
    name: string
    abilities: abilitiesModel[]
    moves : movesModel[]
}

export type abilitiesModel = {
    name: string
    url: string
}

export type movesModel = {
    name: string
    url: string
}