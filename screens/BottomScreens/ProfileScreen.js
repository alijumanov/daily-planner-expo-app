import { StyleSheet, Text, View } from 'react-native';
import FullBackground from '../../components/FullBackground';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <FullBackground />
            <Text>Profile Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
