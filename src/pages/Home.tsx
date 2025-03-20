import axios from "axios";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { Skeletons } from "../components/Skeletons";
interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  id: number;
  types: PokemonType[];
}

export const Home = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonsOriginal, setPokemonsOriginal] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPokemons();
    }, []);

    const getPokemons = () => {
        setLoading(true);

        const endpoints = [];
        for (let i = 1; i <= 50; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
        }
        axios.all(endpoints.map(endpoint => axios.get(endpoint)))
        .then((res) => {
                const pokemonsData = res.map((response) => response.data);
                setPokemons(pokemonsData);
                setPokemonsOriginal(pokemonsData);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    const buscarPokemon = (value: string) => {
        if (!value) {
            setPokemons(pokemonsOriginal);
            return;
        }
        const pokemonsFiltrados = pokemonsOriginal.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(value.toLowerCase())
        );
        setPokemons(pokemonsFiltrados);
    }

    return (
        <div>
            <Navbar onSearch={buscarPokemon} />
            <Container maxWidth={false}>
                { loading ? (
                    <Skeletons loading={loading} />
                ) : (
                <Box 
                    
                    display="grid" 
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                        xl: 'repeat(5, 1fr)'
                    }}
                    gap={2} 
                    mt={2}
                >
                    {pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon?.id} name={pokemon?.name} url={pokemon?.sprites?.front_default} types={pokemon?.types} />
                    ))}
                </Box>
                ) }
            </Container>
        </div>
    );
};
