import { Modal, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { native } from "../assets/styles/styles";

export default function ModalComponent(props) {
    return (
        <Modal transparent={true} animationType='none' visible={props.deleteModal} onRequestClose={() => props.changeDeleteModal(false)}>
            <View style={native.modalContainer}>
                <View style={native.modal}>
                    <Text style={native.modalText}>Are you sure you want to delete?</Text>
                    <View style={native.modalBtns}>
                        <Ripple style={native.modalBtn} onPress={() => props.changeDeleteModal(false)}>
                            <Text style={native.modalBtnText}>Cancel</Text>
                        </Ripple>
                        <Ripple style={native.modalBtn} onPress={() => props.deletePlans()}>
                            <Text style={native.modalBtnText}>Delete</Text>
                        </Ripple>
                    </View>
                </View>
            </View>
        </Modal>
    )
};