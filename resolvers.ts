import { pokemonModel, abilitiesModel, movesModel} from "./types.ts";

export const resolvers = {
    pokemon: {
        abilities: async (
            parent: pokemonModel,
            _:unknown,
            __:unknown,
        ):Promise<abilitiesModel[]> => {
            return parent.abilities.map(ability => ({
                name: ability.name,
                url: ability.url
            }))
            
        },

        moves: async (
            parent: pokemonModel,
            _:unknown,
            __:unknown,
        ):Promise<movesModel[]> => {
            return parent.moves.map((elem) => ({
                name: elem.name,
                url: elem.url,
            }));
        },
    },

    abilities: {
        effect: async (
            parent: abilitiesModel,
            _:unknown,
            __:unknown,
        ):Promise<string> => {
            const response = await fetch(parent.url);

            if (!response.ok)
            {
                throw new Error(`Error al buscar las habilidades: ${response.statusText}`);
            }
            const data = await response.json();
            const datosIngles = data.effect_entries.find((datos) => 
                datos.language.name === "en"
            );
            return datosIngles?.effect || "Error: no están los effects en inglés";
        },
    },
    
    moves : {
        power: async (
            parent: movesModel,
            _:unknown,
            __:unknown,
        ):Promise<number> => {
            
            const response = await fetch(parent.url);
            if (!response.ok)
            {
                throw new Error(`Error al buscar el movimiento: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.power;
            }
        },

    Query: {
        pokemon: async (
            _: unknown,
            { id, name }: { id: number; name: string },
            __: unknown
        ): Promise<pokemonModel> => {
            if(id && name)
            {
                throw new Error("No se puede buscar por id y nombre al mismo tiempo");
            }
            if (name)
            {
                name = name.toLowerCase();
            }
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id || name}`);
            
            if (!response.ok)
            {
                throw new Error(`Error al encontrar al pokémon: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            const abilities: abilitiesModel[] = data.abilities.map((elem) => ({
                name: elem.ability.name,
                url: elem.ability.url,
            }));
            
            const moves: movesModel[] = data.moves.map((elem) => ({
                name: elem.move.name,
                url: elem.move.url,
            }));
            
            // El objeto Pokemon con las habilidades y movimientos
            return {
                id: data.id,
                name: data.name,
                abilities: abilities,
                moves: moves,
            };
        }
    }
}