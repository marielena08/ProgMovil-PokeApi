import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

function InfoPokemon({ route }) {
    const [info, setInfo] = useState({});
    const [evolution, setEvolution] = useState([]);
    const [minLevel, setMinLevel] = useState([]);

    useEffect(() => {
        // get pokemon info
        axios.get(route.params.url)
            .then(response => {
                setInfo(response.data);
            });
        //get pokemon evolution with its min level to evolve if it has one
        const pokemonName = route.params.url.split('/')[6];
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
            .then(response => {
                const evolutionChainUrl = response.data.evolution_chain.url;
                axios.get(evolutionChainUrl)
                    .then(response => {
                        const evolutionChain = response.data.chain;
                        const evolution = [];
                        const minLevel = [];
                        evolution.push(evolutionChain.species.name);
                        if (evolutionChain.evolves_to.length > 0) {
                            evolution.push(evolutionChain.evolves_to[0].species.name);
                            if (evolutionChain.evolves_to[0].evolves_to.length > 0) {
                                evolution.push(evolutionChain.evolves_to[0].evolves_to[0].species.name);
                            }
                        }
                        if (evolutionChain.evolves_to.length > 0) {
                            minLevel.push(evolutionChain.evolves_to[0].evolution_details[0].min_level);
                            if (evolutionChain.evolves_to[0].evolves_to.length > 0) {
                                minLevel.push(evolutionChain.evolves_to[0].evolves_to[0].evolution_details[0].min_level);
                            }
                        }
                        setEvolution(evolution);
                        setMinLevel(minLevel);
                    });
            });
    }, []);

    const getPokemonImage = () => {
        const id = info.id;
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.containerStyle}>
            <Image
                source={{ uri: getPokemonImage() }}
                style={styles.pokemonImage}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Nombre: {info.name}</Text>
                <Text style={styles.infoText}>ID: {info.id}</Text>
                <Text style={styles.infoText}>Experiencia Base: {info.base_experience}</Text>
                <Text style={styles.infoText}>Altura: {(info.height ? info.height / 10 : 'Desconocido')} m</Text>
                <Text style={styles.infoText}>Peso: {(info.weight ? info.weight / 10 : 'Desconocido')} kg</Text>
                <Text style={styles.infoText}>Tipos: {info.types && info.types.map(type => type.type.name).join(", ")}</Text>
                <Text style={styles.infoText}>Habilidades: {info.abilities && info.abilities.map(ability => ability.ability.name).join(", ")}</Text>
                <Text style={styles.infoText}>Estadísticas:</Text>
                {info.stats && info.stats.map(stat => (
                    <Text key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</Text>
                ))}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Evolución:</Text>
                {evolution.map((pokemon, index) => (
                    <View key={index} style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{pokemon}</Text>
                        </View>
                        <Image
                            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${info.id + index}.png` }}
                            style={{ width: 50, height: 50, marginRight: 10 }}
                        />
                        {minLevel[index] && <Text> Evoluciona a - Nivel {minLevel[index]}</Text>}

                    </View>
                ))}
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#A3DEC0'
    },
    containerStyle: {
        alignItems: 'center',
    },
    pokemonImage: {
        width: 300,
        height: 250,
        marginRight: 20,
        borderRadius: 150,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
    },
    infoContainer: {
        width: 260,
        minHeight: 'auto',
        flex: 1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    infoText: {
        marginBottom: 5,
        fontSize: 16,
    }
});

export default InfoPokemon;
