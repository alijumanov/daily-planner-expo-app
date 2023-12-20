import { ActionTypes } from "../contants/actionTypes"

export const setPlans = (plan) => {
    return {
        type: ActionTypes.SET_PLANS,
        payload: plan,
    }
};

export const selectCategory = (id) => {
    return {
        type: ActionTypes.SELECTED_CATEGORY,
        payload: id,
    }
};

export const setDailyPlans = (plan) => {
    return {
        type: ActionTypes.SET_DAILY_PLAN,
        payload: plan
    }
};

export const setWeeklyPlans = (plan) => {
    return {
        type: ActionTypes.SET_WEEKLY_PLAN,
        payload: plan
    }
};

export const setMonthlyPlans = (plan) => {
    return {
        type: ActionTypes.SET_MONTHLY_PLAN,
        payload: plan
    }
};

export const setYearlyPlans = (plan) => {
    return {
        type: ActionTypes.SET_YEARLY_PLAN,
        payload: plan
    }
};

export const selectedPlan = (plan) => {
    return {
        type: ActionTypes.SELECTED_PLAN,
        payload: plan,
    }
};

export const savePlan = (plan) => {
    return {
        type: ActionTypes.SAVE_PLAN,
        payload: plan,
    }
};

export const removeSavePlan = (plan) => {
    return {
        type: ActionTypes.REMOVE_SAVE_PLAN,
        payload: plan,
    }
};

export const deletePlan = () => {
    return {
        type: ActionTypes.DELETE_PLAN,
    }
};

export const addPlan = (plan) => {
    return {
        type: ActionTypes.ADD_PLAN,
        payload: plan,
    }
};

// bular dispatch uchun kerak