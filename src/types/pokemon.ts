export interface Pokemon {
  name: string;
  url: string;
  image: string;
}

export interface DetailPokemon {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  abilities: { ability: { name: string } }[];
}
