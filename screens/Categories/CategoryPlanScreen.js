import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Ripple from 'react-native-material-ripple';
import { native } from '../../assets/styles/styles';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import FullBackground from '../../components/FullBackground';
import ModalComponent from '../../components/ModalComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { borderColor, dark, glass, gold, light } from '../../assets/colors/colors';
import { deletePlan, savePlan, selectedPlan } from '../../redux/actions/planActions';

export default function CategoryPlanScreen({ navigation }) {

    const selectedCategory = useSelector((state) => state.setCategory);
    const dataDailyPlans = useSelector((state) => state.dailyPlans.plans);
    const dataWeeklyPlans = useSelector((state) => state.weeklyPlans.plans);
    const dataYearlyPlans = useSelector((state) => state.yearlyPlans.plans);
    const dataMonthlyPlans = useSelector((state) => state.monthlyPlans.plans);
    const dataFavouritePlans = useSelector((state) => state.savedPlans.plans);

    let dataPlans = selectedCategory == 1 ? dataDailyPlans : selectedCategory == 2 ? dataWeeklyPlans : selectedCategory == 3 ? dataMonthlyPlans : dataYearlyPlans;

    const dispatch = useDispatch();
    const [checkArr, setCheckArr] = useState([]);
    const [showNavbar, setShowNavbar] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [allChecked, setAllChecked] = useState(checkArr.length == dataPlans?.length ? true : false);

    function oneSelectPlan(item) {
        dispatch(selectedPlan(item))
        navigation.navigate(`${item.category}${item.id}`)
    };

    function getCheck(item) {
        setShowNavbar(true)
        setCheckArr(checkArr.includes(item) ? checkArr.filter((c) => c != item) : [...checkArr, item])

        if (checkArr.length + 1 == dataPlans?.length && !checkArr.includes(item)) {
            setAllChecked(true)
        } else {
            setAllChecked(false)
        }
        if (checkArr.length == 1 && checkArr.includes(item)) {
            setShowNavbar(false)
        }
    };

    function closeNavbar() {
        setCheckArr([]);
        setShowNavbar(false);
        setAllChecked(false);
    };

    function getAllCheck() {
        setAllChecked(true);
        setCheckArr(dataPlans);
    };

    function notAllCheck() {
        setCheckArr([]);
        setAllChecked(false);
    };

    function savedPlans() {
        setCheckArr([]);
        setShowNavbar(false);
        dispatch(savePlan(dataFavouritePlans?.length > 0 ? [...dataFavouritePlans, ...checkArr?.filter((item) => item.saved == false)] : checkArr.map((item) => item)));
    };

    function changeDeleteModal(item) {
        setDeleteModal(item)
    };

    function deletePlans() {
        setCheckArr([]);
        setShowNavbar(false);
        setDeleteModal(false);
        dispatch(deletePlan());
    };

    return (
        <View style={styles.container}>
            <FullBackground />
            <ModalComponent deleteModal={deleteModal} changeDeleteModal={changeDeleteModal} deletePlans={deletePlans} />
            {showNavbar &&
                <Navbar checkArr={checkArr} closeNavbar={closeNavbar} savedPlans={savedPlans} getAllCheck={getAllCheck} notAllCheck={notAllCheck} changeDeleteModal={changeDeleteModal} allChecked={allChecked} />
            }
            <Ripple onPress={() => navigation.navigate("New plans")} style={native.navigateBtn}>
                <Ionic name='add' size={50} color={dark} />
            </Ripple>
            <ScrollView>
                <View style={styles.cards}>
                    {dataPlans?.map((item) => (
                        <Ripple key={item.id} style={styles.card} onLongPress={() => getCheck(item)} onPress={() => showNavbar ? getCheck(item) : oneSelectPlan(item)}>
                            <View style={styles.title}>
                                <Text style={styles.textBold}>{item.name}</Text>
                                <Ripple onPress={() => alert("OK")}>
                                    <FontAwesome name={item.saved ? "star" : "star-o"} color={gold} size={25} />
                                </Ripple>
                                {checkArr.map((c) => (
                                    c == item &&
                                    <View key={c} style={styles.check}>
                                        <View style={styles.checkCircle}></View>
                                        <Ionic name='checkmark-circle' color={light} size={35} style={styles.checkBtn} />
                                    </View>
                                ))}
                            </View>
                            <View style={styles.percent}>
                                <Text style={styles.percentNumber}>{Math.floor(item?.plans?.length > 0 ? 100 * item?.plans?.filter((k) => k.done == true).length / item?.plans?.length : 0)}%</Text>
                                <View style={styles.percentBar}>
                                    <View style={{ backgroundColor: gold, position: "absolute", height: "100%", left: 0, top: 0, width: `${item?.plans?.length > 0 ? 100 * item.plans.filter((k) => k.done == true).length / item.plans.length : 0}%` }}></View>
                                </View>
                            </View>
                        </Ripple>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cards: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    btn: {
        width: "100%",
    },
    card: {
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderTopWidth: 1,
        overflow: 'hidden',
        paddingVertical: 10,
        borderLeftWidth: 0.7,
        paddingHorizontal: 15,
        borderRightWidth: 0.1,
        backgroundColor: glass,
        borderColor: borderColor,
    },
    title: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textBold: {
        fontSize: 19,
        color: light,
        lineHeight: 30,
        fontWeight: '500',
    },
    check: {
        right: 0,
        width: 37,
        height: 37,
        position: "absolute",
    },
    checkBtn: {
        top: 0,
        right: -5,
        position: "absolute",
    },
    checkCircle: {
        top: 5,
        right: 0,
        width: 27,
        height: 27,
        borderRadius: 100,
        position: "absolute",
        backgroundColor: dark,
    },
    percent: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    percentNumber: {
        fontSize: 16,
        width: "15%",
        color: light,
        marginRight: 10,
        fontWeight: "600",
    },
    percentBar: {
        height: 7,
        width: "81%",
        borderRadius: 10,
        overflow: 'hidden',
        position: "relative",
        backgroundColor: light,
    }
});
