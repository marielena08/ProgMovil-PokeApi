import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

function InfoPokemon({ route }) {
    const [info, setInfo] = useState({});

    useEffect(() => {
        axios.get(route.params.url)
            .then(response => {
                setInfo(response.data);
            });
    }, []);

    const getPokemonImage = () => {
        const id = info.id;
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }

    return (
        <View style={styles.container}>
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#A3DEC0' 
    },
    pokemonImage: {
        width: 600,
        height: 500,
        marginRight: 20,
        borderRadius: 150, 
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
    },
    infoContainer: {
        width: 200,
        flex: 1,
        padding: 15,
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
