import Ionic from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/BottomScreens/HomeScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewPlanScreen from "../screens/BottomScreens/NewPlanScreen";
import ProfileScreen from "../screens/BottomScreens/ProfileScreen";
import SettingsScreen from "../screens/BottomScreens/SettingsScreen";
import FavouritePlansScreen from "../screens/BottomScreens/FavouritePlansScreen";

// data of main screens

export const dataBottomTabScreens = [
    { id: 1, name: "Your plans", component: HomeScreen, activeIcon: "grid", inActiveIcon: "grid-outline", size: 33, awesome: Ionic },
    { id: 2, name: "New plans", component: NewPlanScreen, activeIcon: "add-circle", inActiveIcon: "add-circle-outline", size: 38, awesome: Ionic },
    { id: 3, name: "Profile", component: ProfileScreen, activeIcon: "person-circle", inActiveIcon: "person-circle-outline", size: 38, awesome: Ionic },
    { id: 4, name: "Favourite plans", component: FavouritePlansScreen, activeIcon: "star", inActiveIcon: "star-o", size: 33, awesome: FontAwesome },
    { id: 5, name: "Settings", component: SettingsScreen, activeIcon: "ios-settings", inActiveIcon: "ios-settings-outline", size: 33, awesome: Ionic }
];
