import MainScreens from "./MainScreens";
import { useSelector } from "react-redux";
import { dark } from "../assets/colors/colors";
import OnePlanScreen from "./OnePlan/OnePlanScreen";
import CategoryPlanScreen from "./Categories/CategoryPlanScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function StackScreens() {

    const Stack = createNativeStackNavigator();
    let dataPlans = useSelector((state) => state.allPlans.plans);

    const dataPlansCategory = [
        { id: 1, name: "Daily plans", link: "Daily plans" },
        { id: 2, name: "Weekly plans", link: "Weekly plans" },
        { id: 3, name: "Monthly plans", link: "Monthly plans" },
        { id: 4, name: "Yearly plans", link: "Yearly plans" }
    ];

    return (
        <Stack.Navigator>

            {/* main screens: bottom tab navigator */}

            <Stack.Screen name='Main' component={MainScreens} options={{
                headerShown: false
            }} />

            {/* category of plans stack screens */}

            {dataPlansCategory.map((item) => (
                <Stack.Screen key={item.id} options={{
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: dark,
                    }
                }} name={item.link} component={CategoryPlanScreen} />
            ))}

            {/* daily plans stack screens */}

            {dataPlans?.map((item) => (
                <Stack.Screen key={item.id} options={{
                    headerTitle: item.name,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: dark,
                    }
                }} name={`${item.category}${item.id}`} component={OnePlanScreen} />
            ))}

        </Stack.Navigator>
    )
};

export default StackScreens;