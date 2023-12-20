import Ripple from 'react-native-material-ripple';
import { dark, light } from '../assets/colors/colors';
import { StyleSheet, Text, View } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Navbar(props) {
    return (
        <View style={styles.container}>
            <Ripple onPress={() => props.closeNavbar()} style={styles.cancel}>
                <Ionic name='close' size={25} color={dark} />
                <Text style={styles.cancelNumber}>{props.checkArr.length}</Text>
            </Ripple>
            <Ripple onPress={() => props.allChecked ? props.notAllCheck() : props.getAllCheck()} rippleContainerBorderRadius={500}>
                {props.allChecked ?
                    <Ionic name='checkmark-circle' color={dark} size={23} />
                    :
                    <FontAwesome name='circle-thin' size={25} color={dark} />
                }
            </Ripple>
            {/* <Ripple onPress={() => props.savedPlans()}>
                    <FontAwesome name={props.saveAll ? "star-o" : "star"} size={25} color={dark} />
                </Ripple> */}
            <Ripple onPress={() => props.changeDeleteModal(true)}>
                <Ionic name='trash-outline' size={25} color={dark} />
            </Ripple>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        width: "100%",
        paddingVertical: 7,
        position: "absolute",
        flexDirection: "row",
        paddingHorizontal: 20,
        backgroundColor: light,
        justifyContent: "space-between",
    },
    cancel: {
        flexDirection: "row",
        alignItems: "center",
    },
    cancelNumber: {
        color: dark,
        fontSize: 15,
        marginLeft: 13,
        lineHeight: 17,
        fontWeight: "600",
    },
    icons: {
        width: "47%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
