import Ripple from 'react-native-material-ripple';
import { native } from '../../assets/styles/styles';
import { StyleSheet, Text, View } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setPlans } from '../../redux/actions/planActions';
import FullBackground from '../../components/FullBackground';
import { borderColor, dark, glass, gold, light } from '../../assets/colors/colors';

export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();

    const dataDailyPlans = useSelector((state) => state.dailyPlans.plans);
    const dataWeeklyPlans = useSelector((state) => state.weeklyPlans.weeklyPlans);
    const dataYearlyPlans = useSelector((state) => state.yearlyPlans.yearlyPlans);
    const dataMonthlyPlans = useSelector((state) => state.monthlyPlans.monthlyPlans);

    const dataPlansCategory = [
        { id: 1, name: "Daily plans", several: dataDailyPlans?.length > 0 ? dataDailyPlans?.length : 0, result: dataDailyPlans?.length > 0 ? Math.floor(100 * dataDailyPlans?.filter((c) => c.plans.filter((k) => k.done == true).length > c.plans.length / 2).length / dataDailyPlans?.length) : 0, link: "Daily plans", base: dataDailyPlans, },
        { id: 2, name: "Weekly plans", several: dataWeeklyPlans?.length > 0 ? dataWeeklyPlans?.length : 0, result: dataWeeklyPlans?.length > 0 ? Math.floor(100 * dataWeeklyPlans?.filter((c) => c.plans.filter((k) => k.done == true).length > c.plans.length / 2).length / dataWeeklyPlans?.length) : 0, link: "Weekly plans", base: dataWeeklyPlans, },
        { id: 3, name: "Monthly plans", several: dataMonthlyPlans?.length > 0 ? dataMonthlyPlans?.length : 0, result: dataMonthlyPlans?.length > 0 ? Math.floor(100 * dataMonthlyPlans?.filter((c) => c.plans.filter((k) => k.done == true).length > c.plans.length / 2).length / dataMonthlyPlans?.length) : 0, link: "Monthly plans", base: dataMonthlyPlans, },
        { id: 4, name: "Yearly plans", several: dataYearlyPlans?.length > 0 ? dataYearlyPlans?.length : 0, result: dataYearlyPlans?.length > 0 ? Math.floor(100 * dataYearlyPlans?.filter((c) => c.plans.filter((k) => k.done == true).length > c.plans.length / 2).length / dataYearlyPlans?.length) : 0, link: "Yearly plans", base: dataYearlyPlans, }
    ];

    function slectPlanCategory(item) {
        dispatch(setPlans(item.base))
        navigation.navigate(item.link)
        dispatch(selectCategory(item.id))
    }

    return (
        <View style={styles.container}>
            <FullBackground />
            <Ripple onPress={() => navigation.navigate("New plans")} style={native.navigateBtn}>
                <Ionic name='add' size={50} color={dark} />
            </Ripple>
            <View style={styles.cards}>
                {dataPlansCategory.map((item) => (
                    <Ripple key={item.id} style={styles.card} onPress={() => slectPlanCategory(item)}>
                        <View style={styles.texts}>
                            <Text style={styles.textBold}>{item.name}</Text>
                            <Text style={styles.textRegular}>({item.several} plans)</Text>
                        </View>
                        <View style={styles.percent}>
                            <Text style={styles.percentNumber}>{item.result}%</Text>
                            <View style={styles.percentBar}>
                                <View style={{ backgroundColor: gold, position: "absolute", height: "100%", left: 0, top: 0, width: `${item.result}%` }}></View>
                            </View>
                        </View>
                    </Ripple>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cards: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        width: "100%",
    },
    card: {
        padding: 20,
        width: "100%",
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
        borderTopWidth: 1,
        overflow: 'hidden',
        borderLeftWidth: 0.7,
        borderRightWidth: 0.1,
        backgroundColor: glass,
        borderColor: borderColor,
    },
    texts: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    textBold: {
        fontSize: 23,
        color: light,
        lineHeight: 30,
        fontWeight: '500',
    },
    textRegular: {
        fontSize: 17,
        opacity: 0.8,
        marginLeft: 7,
        color: light,
        lineHeight: 27,
        fontWeight: '400',
    },
    percent: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    percentNumber: {
        fontSize: 17,
        color: light,
        marginRight: 10,
        fontWeight: "600",
    },
    percentBar: {
        height: 9,
        width: "83%",
        borderRadius: 10,
        overflow: 'hidden',
        position: "relative",
        backgroundColor: light,
    }
});
