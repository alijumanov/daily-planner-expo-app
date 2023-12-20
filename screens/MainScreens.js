import { dataBottomTabScreens } from '../api/Api';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function MainScreens() {

    const TabButton = (props) => {

        const { activeIcon, inActiveIcon, size, Awesome, onPress, accessibilityState } = props;

        const focused = accessibilityState.selected;

        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View>
                    <Awesome name={focused ? activeIcon : inActiveIcon} size={size} color={focused ? `#0F8582` : `#0A2647`} />
                </View>
            </TouchableOpacity>
        )
    }

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerTitleAlign: "center",
            headerTitleStyle: {
                color: "#0A2647"
            }
        }}>
            {dataBottomTabScreens.map((item) => (
                <Tab.Screen key={item.id} name={item.name} component={item.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TabButton {...props} activeIcon={item.activeIcon} inActiveIcon={item.inActiveIcon} Awesome={item.awesome} size={item.size} />
                    }}
                />
            ))}
        </Tab.Navigator>
    )
};

export default MainScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});