interface PokeapiPokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

interface PokeapiPokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

export interface PokeapiPokemon {
    id: number;
    name: string;
    sprites: {
        back_default: string;
        front_default: string;
    };
    stats: PokeapiPokemonStat[];
    types: PokeapiPokemonType[];
}