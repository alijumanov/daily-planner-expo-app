import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FullBackground() {
    return (
        <LinearGradient style={styles.container} colors={["#0F8582", "#0B4158EB", "#0A2647"]} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}>
            {/* <View style={styles.circle1}></View>
            <View style={styles.circle2}></View>
            <View style={styles.circle3}></View> */}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    circle1: {
        top: -15,
        left: -90,
        width: 230,
        height: 230,
        borderRadius: 200,
        position: "absolute",
        backgroundColor: "#277BC0",
    },
    circle2: {
        left: -130,
        width: 460,
        height: 460,
        bottom: -110,
        borderRadius: 500,
        position: "absolute",
        backgroundColor: "#277BC0",
    },
    circle3: {
        top: 180,
        width: 320,
        right: -100,
        height: 320,
        borderRadius: 500,
        position: "absolute",
        backgroundColor: "#0A2647",
    }
});
