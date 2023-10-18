import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

function Lista({ navigation, route }) {
    const url = `https://pokeapi.co/api/v2/generation/${route.params.generation}/`;

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setPokemons(response.data.pokemon_species);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los Pokémon:", error);
            });

    }, []);

    const getImageFromPokemonName = (name) => {
        const pokemon = pokemons.find(p => p.name === name);
        const id = pokemon.url.split("/")[6];
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#A3DEC0'}}>
            {pokemons.length === 0 ? (
                <Text>No hay Pokémon disponibles.</Text>
            ) : (
                <FlatList
                    data={pokemons}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.pokemonContainer}
                            onPress={() => navigation.navigate('InfoPokemon', { url: item.url })}
                        >
                            <Image 
                                style={styles.pokemonImage}
                                source={{ uri: getImageFromPokemonName(item.name) }}
                            />
                            <Text style={styles.pokemonName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
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

export default Lista;
