import { PokeapiListItem } from "./pokeapi-list-item";

export interface PokeapiListResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<PokeapiListItem>;
}