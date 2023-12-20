import { useEffect, useState } from 'react';
import Ripple from 'react-native-material-ripple';
import { native } from '../../assets/styles/styles';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../../components/ModalComponent';
import FullBackground from '../../components/FullBackground';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { danger, dark, glass, gold, green, light } from '../../assets/colors/colors';
import { selectedPlan, setDailyPlans, setPlans } from '../../redux/actions/planActions';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

function ChildItem(props) {

    const { c, setScrollEnable, scrollEnable, changeChildName, showTimeModal, setShowTimeModal, changeChildTime, deleteChildPlan, finishedChildPlan, changeNotif } = props

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
                <Ripple onPress={() => deleteChildPlan(c)}>
                    <FontAwesome name='trash-o' color={danger} size={35} />
                </Ripple>
            </Animated.View>
            <PanGestureHandler onGestureEvent={panGesture} onActivated={() => changeScroll(false)} onEnded={() => changeScroll(true)}>
                <Animated.View style={[styles.childPlan, rStyle]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={styles.deadline}>
                            <Ripple style={styles.timeBtn} onPress={() => setShowTimeModal(c.id)}>
                                <Text style={styles.timeNumber}>{new Date(c.deadline).getHours()}</Text>
                            </Ripple>
                            <Text>:</Text>
                            <Ripple style={styles.timeBtn} onPress={() => setShowTimeModal(c.id)}>
                                <Text style={styles.timeNumber}>{new Date(c.deadline).getMinutes()}</Text>
                            </Ripple>
                            {showTimeModal == c.id &&
                                <RNDateTimePicker mode='time' value={c.deadline} onChange={(event, selectedDate) => changeChildTime(event, selectedDate, c)} />
                            }
                        </View>
                        <Ripple onPress={() => c.notif ? changeNotif(c, false) : changeNotif(c, true)}>
                            {c.notif ?
                                <Ionic name='notifications-outline' color={dark} size={30} />
                                :
                                <Ionic name='notifications-off-outline' color={dark} size={30} />
                            }
                        </Ripple>
                    </View>
                    <TextInput style={styles.childName} multiline={true} numberOfLines={2} value={c.name} onChangeText={(text) => changeChildName(text, c)} />
                    <TouchableOpacity onPress={() => c.done ? finishedChildPlan(c, false) : finishedChildPlan(c, true)} style={{ position: "absolute", right: 5 }}>
                        {c.done ?
                            <Ionic name='checkmark-circle' color={green} size={35} />
                            :
                            <View style={styles.checkBtn}></View>
                        }
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

export default function OnePlanScreen({ navigation }) {

    const dispatch = useDispatch();
    let data = useSelector((state) => state.plan);
    const dataDailyPlans = useSelector((state) => state.dailyPlans.plans);

    const [saved, setSaved] = useState(data.saved);
    const [nameVal, setNameVal] = useState(data.name);
    const [plansArr, setPlansArr] = useState(data.plans);
    const [date, setDate] = useState(new Date(data.date));
    const [deleteModal, setDeleteModal] = useState(false);
    const [scrollEnable, setScrollEnable] = useState(true);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [dateValue, setDateValue] = useState(new Date(date));

    function changeDeleteModal(item) {
        setDeleteModal(item)
    };

    function savedPlan(item) {
        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: data.name, category: data.category, saved: item, date: data.date, plans: data.plans }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: data.name, category: data.category, saved: item, date: data.date, plans: data.plans }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )))
        setSaved(!saved);
    };

    function deletePlans() {
        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [] : [...dataDailyPlans?.filter((c) => c.id != data.id)].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )))
        setDeleteModal(false);
        navigation.navigate("Daily plans")
    };

    function changeNamePlan(item) {
        setNameVal(item);
        let textVal = item;

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: item, category: data.category, saved: saved, date: data.date, plans: data.plans }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: item, category: data.category, saved: saved, date: data.date, plans: data.plans }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(setPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: item, category: data.category, saved: saved, date: data.date, plans: data.plans }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: item, category: data.category, saved: saved, date: data.date, plans: data.plans }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: textVal, category: data.category, saved: saved, date: data.date, plans: data.plans }))
    };

    function changeDateValue(event, selectedDate) {
        setDate(selectedDate);
        setShowDateModal(false);
        setDateValue(new Date(selectedDate));
        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: selectedDate, plans: data.plans }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: selectedDate, plans: data.plans }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )))
    };

    // child plans methods

    function changeChildName(value, item) {
        setPlansArr([...data.plans.filter((c) => c.id != item.id), { id: item.id, name: value, done: item.done, notif: item.notif, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ));

        let arr = [...data.plans.filter((c) => c.id != item.id), { id: item.id, name: value, done: item.done, notif: item.notif, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        );

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }))
    };

    function changeChildTime(event, selectedDate, item) {
        setPlansArr([...data.plans.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: item.done, notif: item.notif, deadline: selectedDate }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ));

        let arr = [...data.plans.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: item.done, notif: item.notif, deadline: selectedDate }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        );

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }));

        setShowTimeModal(0);
    };

    function deleteChildPlan(item) {
        setPlansArr([...data.plans.filter((c) => c.id != item.id)].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ));

        let arr = [...data.plans.filter((c) => c.id != item.id)].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        );

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }))
    };

    function finishedChildPlan(item, value) {
        setPlansArr([...data.plans.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: value, notif: item.notif, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ));

        let arr = [...data.plans.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: value, notif: item.notif, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        );

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }))
    };

    function changeNotif(item, value) {
        setPlansArr([...data.plans.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: item.done, notif: value, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        ));

        let arr = [...data.plans.filter((c) => c.id != item.id), { id: item.id, name: item.name, done: item.done, notif: value, deadline: item.deadline }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        );

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }))
    };

    function addNewChildPlan() {
        setPlansArr([...data?.plans?.map((c) => c), { id: Number(data?.plans?.slice(data?.plans?.length - 1, data?.plans?.length).map((k) => k.id)) + 1, name: "Untitled", done: false, notif: true, deadline: new Date() }]);

        let arr = [...data?.plans?.map((c) => c), { id: Number(data?.plans?.slice(data?.plans?.length - 1, data?.plans?.length).map((k) => k.id)) + 1, name: "Untitled", done: false, notif: true, deadline: new Date() }];

        dispatch(setDailyPlans(dataDailyPlans?.length == 1 ? [{ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }] : [...dataDailyPlans?.filter((c) => c.id != data.id), { id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }].sort(
            function (a, b) {
                return parseInt(a.id) > parseInt(b.id)
            }
        )));

        dispatch(selectedPlan({ id: data.id, name: nameVal, category: data.category, saved: saved, date: data.date, plans: arr }))
    }

    return (
        <View style={styles.container}>
            <FullBackground />
            <ModalComponent deleteModal={deleteModal} changeDeleteModal={changeDeleteModal} deletePlans={deletePlans} />
            <Ripple onPress={() => navigation.navigate("New plans")} style={native.navigateBtn}>
                <Ionic name='add' size={50} color={dark} />
            </Ripple>
            <View>
                <ScrollView style={styles.cards} scrollEnabled={scrollEnable}>
                    <View style={styles.card}>
                        <View style={styles.icons}>
                            <Ripple onPress={() => changeDeleteModal(true)}>
                                <FontAwesome name='trash-o' color={light} size={30} />
                            </Ripple>
                            <Ripple onPress={() => savedPlan(!saved)}>
                                <FontAwesome name={saved ? "star" : "star-o"} color={gold} size={25} />
                            </Ripple>
                        </View>
                        <TextInput value={nameVal} style={native.nameInput} onChangeText={(text) => changeNamePlan(text)} />
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
                        </View>
                        {plansArr.map((c) => (
                            <View key={c.id}>
                                <ChildItem c={c} scrollEnable={scrollEnable} setScrollEnable={setScrollEnable} changeChildName={changeChildName} showTimeModal={showTimeModal} setShowTimeModal={setShowTimeModal} changeChildTime={changeChildTime} deleteChildPlan={deleteChildPlan} finishedChildPlan={finishedChildPlan} changeNotif={changeNotif} />
                            </View>
                        ))}
                        <View style={styles.editContainer}>
                            <Ripple rippleContainerBorderRadius={500} style={styles.editBtn} onPress={addNewChildPlan}>
                                <Ionic name='add' color={light} size={33} />
                            </Ripple>
                        </View>
                        {showDateModal &&
                            <RNDateTimePicker mode='date' value={date} onChange={changeDateValue} />
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cards: {
        height: "100%",
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: glass,
    },
    card: {
        width: "100%",
        paddingTop: 30,
        paddingBottom: 25,
        overflow: 'hidden',
        paddingHorizontal: 20,
    },
    icons: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    childPlan: {
        marginTop: 20,
        width: "100%",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: light,
        justifyContent: "center",
        paddingRight: 45,
    },
    childName: {
        color: dark,
        fontSize: 18,
        marginLeft: 5,
        marginTop: 10,
        fontWeight: "500",
    },
    deadline: {
        width: 100,
        marginLeft: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeBtn: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: dark,
        paddingVertical: 1,
        paddingHorizontal: 10,
    },
    timeNumber: {
        color: dark,
        fontSize: 14,
        fontWeight: "500"
    },
    checkBtn: {
        width: 28,
        height: 28,
        borderWidth: 2,
        marginRight: 5,
        borderRadius: 200,
        marginVertical: 5,
        borderColor: green,
    },
    editContainer: {
        marginTop: 30,
        width: "100%",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    editBtn: {
        width: 55,
        height: 55,
        borderWidth: 2,
        borderRadius: 500,
        borderColor: light,
        alignItems: "center",
        justifyContent: "center",
    },
});
