import { useState } from 'react';
import Ripple from 'react-native-material-ripple';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyPlans } from '../redux/actions/planActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { borderColor, dark, darkGlass, glass, danger, light } from '../assets/colors/colors';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

function ChildItem(props) {

    const { item, setScrollEnable, scrollEnable, showTimeModal, setShowTimeModal, changeTimeValue, changeNotif, changeChildName, deleteChildPlan } = props;

    const { width: SCREEN_WIDTH } = Dimensions.get("window");
    const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

    const translateX = useSharedValue(0);

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            if (scrollEnable) {
                translateX.value = withTiming(0)
            } else {
                translateX.value = event.translationX
            }
        },
        onEnd: () => {
            if (translateX.value < TRANSLATE_X_THRESHOLD) {
                translateX.value = withTiming(TRANSLATE_X_THRESHOLD * 4)
            } else if (translateX.value > TRANSLATE_X_THRESHOLD * 4) {
                translateX.value = withTiming(0)
            }
        }
    });

    function changeScroll(item) {
        setScrollEnable(item)
    };

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value < 0 ? translateX.value : withTiming(0),
            },
        ],
    }));

    const rIconStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value < TRANSLATE_X_THRESHOLD / 2 ? 1 : 0
        );
        return { opacity }
    })

    return (
        <GestureHandlerRootView style={{ position: "relative", alignItems: "flex-end", justifyContent: "center" }}>
            <Animated.View style={[{ position: "absolute", right: 10, paddingTop: 20 }, rIconStyle]}>
                <Ripple onPress={() => deleteChildPlan(item)}>
                    <FontAwesome name='trash-o' color={danger} size={35} />
                </Ripple>
            </Animated.View>
            <PanGestureHandler onGestureEvent={panGesture} onActivated={() => changeScroll(false)} onEnded={() => changeScroll(true)}>
                <Animated.View style={[styles.plan, rStyle]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={styles.deadline}>
                            <Ripple style={styles.childDateBtn} onPress={() => setShowTimeModal(item.id)}>
                                <Text style={styles.childDateNumber}>{new Date(item.deadline).getDate()}.{new Date(item.deadline).getMonth() + 1}.{new Date(item.deadline).getFullYear()}</Text>
                            </Ripple>
                            {showTimeModal == item.id &&
                                <RNDateTimePicker mode='date' value={item.deadline} onChange={(event, selectedDate) => changeTimeValue(event, selectedDate, item)} />
                            }
                        </View>
                        <Ripple onPress={() => changeNotif(item)} style={styles.view}>
                            <Text style={styles.viewText}>View</Text>
                        </Ripple>
                    </View>
                    <TextInput multiline={true} numberOfLines={2} value={item.name} style={[styles.planName, { borderColor: item.name == "Untitled" ? darkGlass : light }]} onChangeText={(text) => changeChildName(text, item)} />
                    <Ionic name='pencil' color={item.name == "Untitled" ? darkGlass : light} size={18} style={{ position: "absolute", right: 15, bottom: 13 }} />
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

export default function NewMonthlyPlan() {

    const dispatch = useDispatch();
    const dataDailyPlans = useSelector((state) => state.dailyPlans.plans);

    const [date, setDate] = useState(new Date());
    const [planName, setPlanName] = useState("Untitled");
    const [showTimeModal, setShowTimeModal] = useState(0);
    const [scrollEnable, setScrollEnable] = useState(true);
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
        setPlansArr([...plansArr.map((c) => c), { id: Number(plansArr?.slice(plansArr?.length - 1, plansArr?.length).map((k) => k.id)) + 1, name: "Untitled", done: false, notif: true, deadline: new Date() }])
    };

    function deleteChildPlan(item) {
        setPlansArr(plansArr.filter((c) => c != item))
    };

    let data = { id: dataDailyPlans?.length > 0 ? dataDailyPlans.length + 1 : 1, name: planName, category: 1, saved: false, date: date, plans: plansArr };

    function saveAllPlans() {

        dispatch(setDailyPlans(dataDailyPlans?.includes(data) ? dataDailyPlans?.map((c) => c) : dataDailyPlans?.length > 0 ? [...dataDailyPlans, data] : [data]));

        setDate(new Date());
        setPlanName("Untitled");
        setDateValue(new Date(date));
        setPlansArr([{ id: 1, name: "Untitled", done: false, notif: true, deadline: new Date() }]);
    };

    return (
        <ScrollView scrollEnabled={scrollEnable}>
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
                            <View key={item.id}>
                                <ChildItem item={item} scrollEnable={scrollEnable} setScrollEnable={setScrollEnable} showTimeModal={showTimeModal} setShowTimeModal={setShowTimeModal} changeTimeValue={changeTimeValue} changeNotif={changeNotif} changeChildName={changeChildName} deleteChildPlan={deleteChildPlan} />
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
        // paddingHorizontal: 20,
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
        paddingBottom: 40,
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
        width: "100%",
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
        borderColor: darkGlass,
    },
    deadline: {
        width: 150,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    childDateBtn: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: dark,
        paddingVertical: 2,
        paddingHorizontal: 13,
    },
    childDateNumber: {
        color: dark,
        fontSize: 14,
        fontWeight: "500"
    },
    view: {
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 15,
        backgroundColor: dark,
    },
    viewText: {
        color: light,
        fontSize: 15,
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
