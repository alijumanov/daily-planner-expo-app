import { combineReducers } from "redux";
import { addPlanReducer, categoryReducer, dailyPlansReducer, deletePlanReducer, monthlyPlansReducer, planReducer, savedPlanReducer, selectedPlanReducer, weeklyPlansReducer, yearlyPlansReducer } from "./planReducer";

const reducers = combineReducers({
    allPlans: planReducer,
    plan: selectedPlanReducer,
    addedPlans: addPlanReducer,
    setCategory: categoryReducer,
    savedPlans: savedPlanReducer,
    dailyPlans: dailyPlansReducer,
    weeklyPlans: weeklyPlansReducer,
    monthlyPlans: monthlyPlansReducer,
    yearlyPlans: yearlyPlansReducer,
    deletedPlans: deletePlanReducer,
});

export default reducers;

// bular data ni export-import qilish uchun kerak