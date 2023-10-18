import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Lista from './Lista';
import InfoPokemon from './InfoPokemon';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Lista" component={Lista} />
                <Stack.Screen name="InfoPokemon" component={InfoPokemon} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
