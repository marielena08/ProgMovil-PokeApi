import React from 'react';
import { View, Button, TextInput } from 'react-native';

function Home({ navigation }) {
    return (
        <View>
            <TextInput placeholder="Buscar Pokémon" />
            <Button title="Generación 1" onPress={() => navigation.navigate('Lista', { generation: 1 })} />
            <Button title="Generación 2" onPress={() => navigation.navigate('Lista', { generation: 2 })} />
            <Button title="Generación 3" onPress={() => navigation.navigate('Lista', { generation: 3 })} />
            <Button title="Generación 4" onPress={() => navigation.navigate('Lista', { generation: 4 })} />
            <Button title="Generación 5" onPress={() => navigation.navigate('Lista', { generation: 5 })} />
            <Button title="Generación 6" onPress={() => navigation.navigate('Lista', { generation: 6 })} />
            <Button title="Generación 7" onPress={() => navigation.navigate('Lista', { generation: 7 })} />
            <Button title="Generación 8" onPress={() => navigation.navigate('Lista', { generation: 8 })} />
            <Button title="Generación 9" onPress={() => navigation.navigate('Lista', { generation: 9 })} />
        </View>
    );
}

export default Home;
