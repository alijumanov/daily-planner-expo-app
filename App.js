import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import StackScreens from './screens/StackScreens';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <StackScreens />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
