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
                setPokemon({ id: null });
                console.error("Hubo un error al obtener el Pokémon:", error);
            });
    }, [pokemonName]);

    //mostrar pokemon en pantalla si existe el pokemon en la api o no existe el pokemon en la api
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
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>#{pokemon.id}</Text>
                    <Text style={styles.pokemonName}>{pokemon.name}</Text>
                    {/*tipos del pokemon*/}
                    <View style={{ flexDirection: 'row' }}>
                        {pokemon.types.map((type, index) => {
                            return (
                                <View key={index} style={{ backgroundColor: '#A3DEC0', borderRadius: 5, padding: 5, margin: 5 }}>
                                    <Text style={{ fontSize: 16 }}>{type.type.name}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else if (pokemon.id === null) {
        return (
            <View style={styles.pokemonContainer}>
                <Text style={{ fontSize: 16 }}>No se encontró el Pokémon</Text>
            </View>
        );

    }
    else if (pokemon.id === null && pokemonName !== '') {
        return (
            <View style={styles.pokemonContainer}>
                <Text style={{ fontSize: 16 }}>Buscando Pokémon...</Text>
            </View>
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