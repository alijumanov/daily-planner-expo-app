import { StyleSheet } from "react-native";
import { dark, darkGlass, light } from "../colors/colors";

export const native = StyleSheet.create({

    // navigate create btn

    navigateBtn: {
        zIndex: 2,
        right: 10,
        width: 70,
        height: 70,
        bottom: 10,
        borderRadius: 100,
        position: "absolute",
        alignItems: "center",
        backgroundColor: light,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

    // modal

    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: darkGlass,
    },
    modal: {
        padding: 20,
        width: "70%",
        borderRadius: 20,
        backgroundColor: light,
    },
    modalText: {
        color: dark,
        fontSize: 17,
        fontWeight: "500",
        textAlign: "center",
    },
    modalBtns: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalBtn: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 23,
        backgroundColor: dark,
    },
    modalBtnText: {
        color: light,
        fontSize: 18,
    },

    // name input

    nameInput: {
        color: light,
        fontSize: 20,
        marginTop: 3,
        width: "100%",
        paddingBottom: 3,
        fontWeight: "600",
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: light,
    },
});