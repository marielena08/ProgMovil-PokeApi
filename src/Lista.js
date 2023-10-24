import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import PokemonCard from '../components/pokemonCard';

function Lista({ navigation, route }) {
    const url = `https://pokeapi.co/api/v2/generation/${route.params.generation}/`;

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                //oredenar por numero de pokemon
                const pokemonList = response.data.pokemon_species.sort((a, b) => {
                    return a.url.split('/')[6] - b.url.split('/')[6];
                });
                setPokemons(pokemonList);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los Pokémon:", error);
            });
    }, []);

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#A3DEC0'}}>
            {pokemons.length === 0 ? (
                <Text>No hay Pokémon disponibles.</Text>
            ) : (
                <FlatList
                    data={pokemons}
                    keyExtractor={(pokemon) => pokemon.name}
                    renderItem={({ item: pokemon }) => (
                        <PokemonCard navigation={navigation} pokemonName={pokemon.name} />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
});

export default Lista;
