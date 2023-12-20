import { useState } from 'react';
import Ripple from 'react-native-material-ripple';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyPlans } from '../redux/actions/planActions';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { borderColor, dark, darkGlass, glass, light } from '../assets/colors/colors';

export default function NewYearlyPlan() {

    const dispatch = useDispatch();
    const dataDailyPlans = useSelector((state) => state.dailyPlans.plans);

    const [date, setDate] = useState(new Date());
    const [planName, setPlanName] = useState("Untitled");
    const [showTimeModal, setShowTimeModal] = useState(0);
    const [showDateModal, setShowDateModal] = useState(false);
    const [dateValue, setDateValue] = useState(new Date(date));
    const [plansArr, setPlansArr] = useState([{ id: 1, name: "Untitled", done: false, notif: true, deadline: new Date() }]);

    function changeDateValue(event, selectedDate) {
        setDate(selectedDate);
        setShowDateModal(false);
        setDateValue(new Date(selectedDate));
    };

    function changeChildName(value, item) {
        setPlansArr([...plansArr.filter((c) => c.id != item.id), { id: item.id, name: value, done: item.done, notif: item.notif, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ))
    };

    function changeTimeValue(event, selectedDate, item) {
        setPlansArr([...plansArr.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: item.done, notif: item.notif, deadline: selectedDate }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ))
        setShowTimeModal(0);
    };

    function changeNotif(item) {
        setPlansArr([...plansArr.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: item.done, notif: !item.notif, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ))
    };

    function addNewChildPlan() {
        setPlansArr([...plansArr.map((c) => c), { id: plansArr.length + 1, name: "Untitled", done: false, notif: true, deadline: new Date() }])
    };

    let data = { id: dataDailyPlans?.length + 1, name: planName, category: 1, saved: false, date: date, plans: plansArr };

    function saveAllPlans() {

        dispatch(setDailyPlans(dataDailyPlans?.includes(data) ? dataDailyPlans?.map((c) => c) : dataDailyPlans?.length > 0 ? [...dataDailyPlans, data] : [data]));

        setDate(new Date());
        setPlanName("Untitled");
        setDateValue(new Date(date));
        setPlansArr([{ id: 1, name: "Untitled", done: false, notif: true, deadline: new Date() }]);
    }

    return (
        <ScrollView>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <TextInput value={planName} style={styles.nameInput} onChangeText={(text) => setPlanName(text)} />
                    {planName == "Untitled" &&
                        <Ionic name='pencil' color={light} size={22} style={{ position: "absolute", right: 20, top: 20 }} />
                    }
                    <View style={styles.dateContainer}>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>year</Text>
                            <Ripple style={styles.dateBtn} onPress={() => setShowDateModal(true)}>
                                <Text style={styles.dateNumber}>{dateValue.getFullYear()}</Text>
                            </Ripple>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>month</Text>
                            <Ripple style={styles.dateBtn} onPress={() => setShowDateModal(true)}>
                                <Text style={styles.dateNumber}>{dateValue.getMonth() + 1}</Text>
                            </Ripple>
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>date</Text>
                            <Ripple style={styles.dateBtn} onPress={() => setShowDateModal(true)}>
                                <Text style={styles.dateNumber}>{dateValue.getDate()}</Text>
                            </Ripple>
                        </View>
                        {showDateModal &&
                            <RNDateTimePicker mode='date' value={date} onChange={changeDateValue} />
                        }
                    </View>
                    <View style={styles.plansContainer}>
                        {plansArr.map((item) => (
                            <View key={item.id} style={styles.plan}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={styles.deadline}>
                                        <Ripple style={styles.timeBtn} onPress={() => setShowTimeModal(item.id)}>
                                            <Text style={styles.timeNumber}>{new Date(item.deadline).getHours()}</Text>
                                        </Ripple>
                                        <Text>:</Text>
                                        <Ripple style={styles.timeBtn} onPress={() => setShowTimeModal(item.id)}>
                                            <Text style={styles.timeNumber}>{new Date(item.deadline).getMinutes()}</Text>
                                        </Ripple>
                                        {showTimeModal == item.id &&
                                            <RNDateTimePicker mode='time' value={item.deadline} onChange={(event, selectedDate) => changeTimeValue(event, selectedDate, item)} />
                                        }
                                    </View>
                                    <Ripple onPress={() => changeNotif(item)}>
                                        {item.notif ?
                                            <Ionic name='notifications-outline' color={dark} size={30} />
                                            :
                                            <Ionic name='notifications-off-outline' color={dark} size={30} />
                                        }
                                    </Ripple>
                                </View>
                                <TextInput multiline={true} numberOfLines={2} value={item.name} style={[styles.planName, { borderColor: item.name == "Untitled" ? darkGlass : light }]} onChangeText={(text) => changeChildName(text, item)} />
                                <Ionic name='pencil' color={item.name == "Untitled" ? darkGlass : light} size={18} style={{ position: "absolute", right: 15, bottom: 13 }} />
                            </View>
                        ))}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30 }}>
                        <Ripple onPress={() => addNewChildPlan()} style={styles.createPlanBtn} rippleContainerBorderRadius={200}>
                            <Ionic name='add' size={50} color={light} />
                        </Ripple>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30, marginBottom: 10 }}>
                        <Ripple style={styles.saveBtn} onPress={() => saveAllPlans()}>
                            <Text style={styles.saveBtnTxt}>Save plans</Text>
                        </Ripple>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 10,
        borderTopWidth: 1,
        paddingVertical: 15,
        borderLeftWidth: 0.7,
        paddingHorizontal: 20,
        borderRightWidth: 0.1,
        backgroundColor: glass,
        borderColor: borderColor,
    },
    nameInput: {
        color: light,
        fontSize: 19,
        fontWeight: "500",
        borderBottomWidth: 2,
        borderBottomColor: light
    },
    dateContainer: {
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        justifyContent: "center",
    },
    dateText: {
        color: light,
        fontSize: 13,
        opacity: 0.7,
        textAlign: "center",
    },
    dateBtn: {
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: light,
        paddingVertical: 5,
        paddingHorizontal: 17,
    },
    dateNumber: {
        color: light,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    createPlanBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 200,
        borderColor: light,
        alignItems: "center",
        justifyContent: "center",
    },
    plan: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: light,
        justifyContent: "space-between",
    },
    planName: {
        color: dark,
        fontSize: 14,
        marginTop: 10,
        width: "100%",
        fontWeight: "500",
        borderBottomWidth: 1,
        // paddingHorizontal: 7,
        borderColor: darkGlass,
    },
    deadline: {
        width: 120,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeBtn: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: dark,
        paddingVertical: 2,
        paddingHorizontal: 13,
    },
    timeNumber: {
        color: dark,
        fontSize: 14,
        fontWeight: "500"
    },
    saveBtn: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: dark,
    },
    saveBtnTxt: {
        color: light,
        fontSize: 18,
        lineHeight: 19,
        fontWeight: "500",
    },
});
