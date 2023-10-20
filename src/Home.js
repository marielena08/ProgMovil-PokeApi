import axios from 'axios';
import React from 'react';
import { View, button, TouchableOpacity, Text, TextInput, StyleSheet, ImageBackground, Image } from 'react-native';
import { useState, useEffect } from 'react';

const genImages = {
    1: require('../assets/generaciones/1eraGeneración.jpg'),
    2: require('../assets/generaciones/2daGeneración.jpg'),
    3: require('../assets/generaciones/3eraGeneración.jpg'),
    4: require('../assets/generaciones/4taGeneración.jpg'),
    5: require('../assets/generaciones/5taGeneración.jpg'),
    6: require('../assets/generaciones/6taGeneración.jpg'),
    7: require('../assets/generaciones/7maGeneración.jpg'),
    8: require('../assets/generaciones/8vaGeneración.png'),
    9: require('../assets/generaciones/9naGeneración.jpeg'),

};

function Home({ navigation }) {
    function GenerationButton({ generation, title, navigation }) {
        return (
            <TouchableOpacity style={styles.pokemonContainer} onPress={() => navigation.navigate('Lista', { generation })}>
                <ImageBackground source={genImages[generation]} style={styles.imageBackground}>
                    <Text style={styles.buttonText}>{title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    //search pokemon by name
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState({});

    const getPokemon = async () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
            .then(response => {
                setPokemon(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener el Pokémon:", error);
            });
    }

    useEffect(() => {
        if (search) {
            getPokemon();
        }
    }, [search]);

    //show pokemon if found
    function Pokemon({ pokemon }) {
        if (pokemon.id) {
            return (
                    <TouchableOpacity
                        style={styles.pokemonContainer}
                        onPress={() => navigation.navigate('InfoPokemon', { url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}` })}
                    >
                        <Image
                            style={styles.pokemonImage}
                            source={{ uri: pokemon.sprites.front_default }}
                        />
                        <Text style={styles.pokemonName}>{pokemon.name}</Text>
                    </TouchableOpacity>
            );
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar Pokémon"
                onChangeText={text => setSearch(text)}
            />

            <Pokemon pokemon={pokemon} />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>O elige una generación:</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonColumn}>
                    <GenerationButton navigation={navigation} generation={1} title="Generación 1" />
                    <GenerationButton navigation={navigation} generation={3} title="Generación 3" />
                    <GenerationButton navigation={navigation} generation={5} title="Generación 5" />
                    <GenerationButton navigation={navigation} generation={7} title="Generación 7" />
                    <GenerationButton navigation={navigation} generation={9} title="Generación 9" />
                </View>
                <View style={styles.buttonColumn}>
                    <GenerationButton navigation={navigation} generation={2} title="Generación 2" />
                    <GenerationButton navigation={navigation} generation={4} title="Generación 4" />
                    <GenerationButton navigation={navigation} generation={6} title="Generación 6" />
                    <GenerationButton navigation={navigation} generation={8} title="Generación 8" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#A3DEC0'
    },
    input: {
        marginBottom: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonColumn: {
        flexDirection: 'column',
        width: '45%'
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
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

export default Home;
