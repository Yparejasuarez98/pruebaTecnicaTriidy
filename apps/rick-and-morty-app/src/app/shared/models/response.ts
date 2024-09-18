import { Character } from "../../components/list-characters/models/character";

export interface pagination {
    count: number;
    next: string;
    pages: number;
    prev: number;
}

export interface ResponseCharacter {
    info: pagination;
    results: Character[];
}