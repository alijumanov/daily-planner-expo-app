import { useState } from 'react';
import Ripple from 'react-native-material-ripple';
import { StyleSheet, Text, View } from 'react-native';
import NewDailyPlan from '../../components/NewDailyPlan';
import NewWeeklyPlan from '../../components/NewWeeklyPlan';
import NewYearlyPlan from '../../components/NewYearlyPlan';
import NewMonthlyPlan from '../../components/NewMonthlyPlan';
import FullBackground from '../../components/FullBackground';
import { borderColor, dark, glass, light } from '../../assets/colors/colors';

export default function NewPlanScreen() {

    const [active, setActive] = useState(1);

    return (
        <View style={styles.container}>
            <FullBackground />
            <View style={styles.categories}>
                <Ripple style={[styles.category, { backgroundColor: active === 1 ? light : glass }]} rippleContainerBorderRadius={50} onPress={() => setActive(1)}>
                    <Text style={[styles.categoryName, { color: active === 1 ? dark : light }]}>Daily</Text>
                </Ripple>
                <Ripple style={[styles.category, { backgroundColor: active === 2 ? light : glass }]} rippleContainerBorderRadius={50} onPress={() => setActive(2)}>
                    <Text style={[styles.categoryName, { color: active === 2 ? dark : light }]}>Weekly</Text>
                </Ripple>
                <Ripple style={[styles.category, { backgroundColor: active == 3 ? light : glass }]} rippleContainerBorderRadius={50} onPress={() => setActive(3)}>
                    <Text style={[styles.categoryName, { color: active === 3 ? dark : light }]}>Monthly</Text>
                </Ripple>
                <Ripple style={[styles.category, { backgroundColor: active == 4 ? light : glass }]} rippleContainerBorderRadius={50} onPress={() => setActive(4)}>
                    <Text style={[styles.categoryName, { color: active === 4 ? dark : light }]}>Yearly</Text>
                </Ripple>
            </View>
            {
                active == 1 ? <NewDailyPlan /> : active == 2 ? <NewWeeklyPlan /> : active == 3 ? <NewMonthlyPlan /> : <NewYearlyPlan />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categories: {
        width: "100%",
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    category: {
        paddingTop: 3,
        paddingBottom: 5,
        borderRadius: 50,
        borderTopWidth: 1,
        borderLeftWidth: 0.7,
        paddingHorizontal: 10,
        borderRightWidth: 0.1,
        backgroundColor: glass,
        borderColor: borderColor,
    },
    categoryName: {
        color: light,
        fontSize: 16,
        fontWeight: "500",
    },
});
