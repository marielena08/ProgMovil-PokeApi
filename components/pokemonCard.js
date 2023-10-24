import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function PokemonCard({ navigation, pokemonName }) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(response => {
                setPokemon(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener el Pokémon:", error);
            });
    }, [pokemonName]);

    if (pokemon.id) {
        return (
            <TouchableOpacity
                style={styles.pokemonContainer}
                onPress={() => navigation.navigate('InfoPokemon', { url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}` })}
            >
                <Image
                    style={styles.pokemonImage}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }}
                />
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
                <Text style={{ fontSize: 16 }}>#{pokemon.id}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    pokemonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        height: 120
    },
    pokemonImage: {
        height: 150,
        width: 150,
        marginRight: 15,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});