export const schema = `#graphql
    type pokemon {
        id: ID!
        name: String!
        abilities: [abilities!]!
        moves : [moves!]!
    },
    

    type abilities {
        name: String!
        effect: String!
    },

    type moves {
        name: String!
        power: Int
    },
    type Query {
        pokemon(id: Int, name: String): pokemon
    },
`;
