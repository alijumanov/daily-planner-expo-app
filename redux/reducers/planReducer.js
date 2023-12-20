import { ActionTypes } from "../contants/actionTypes";

const initialState = {
    plans: [],
    dailyPlans: [
        {
            id: 1, name: "Plans of today", category: 1, saved: true, date: new Date(), plans: [
                { id: 1, name: "Reading a book", done: true, deadline: new Date() },
                { id: 2, name: "Train a sport", done: true, deadline: new Date() },
                { id: 3, name: "working time", done: true, deadline: new Date() },
                { id: 4, name: "have a lunch", done: false, deadline: new Date() },
                { id: 5, name: "Reading a book", done: false, deadline: new Date() },
                { id: 6, name: "Train a sport", done: false, deadline: new Date() },
                { id: 7, name: "working time", done: false, deadline: new Date() },
                { id: 8, name: "have a lunch", done: false, deadline: new Date() },
            ]
        },
        {
            id: 2, name: "Plans of tommorow", category: 1, saved: false, date: new Date(), plans: [
                { id: 1, name: "Reading a book", done: true, deadline: new Date() },
                { id: 2, name: "Train a sport", done: true, deadline: new Date() },
                { id: 3, name: "working time", done: true, deadline: new Date() },
                { id: 4, name: "have a lunch", done: true, deadline: new Date() },
            ]
        },
    ],
    weeklyPlans: [
        {
            id: 1, name: "Plans of today", category: 1, saved: true, date: new Date(), plans: [
                { id: 1, name: "Reading a book", done: true, deadline: new Date() },
                { id: 2, name: "Train a sport", done: true, deadline: new Date() },
                { id: 3, name: "working time", done: true, deadline: new Date() },
                { id: 4, name: "have a lunch", done: false, deadline: new Date() },
                { id: 5, name: "Reading a book", done: false, deadline: new Date() },
                { id: 6, name: "Train a sport", done: false, deadline: new Date() },
                { id: 7, name: "working time", done: false, deadline: new Date() },
                { id: 8, name: "have a lunch", done: false, deadline: new Date() },
            ]
        },
    ],
    monthlyPlans: [],
    yearlyPlans: [],
};

export const planReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PLANS:
            return { ...state, plans: payload }
        case ActionTypes.DELETE_PLAN:
            return { ...state, plans: payload }
        default:
            return state
    }
};

export const categoryReducer = (state = 0, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_CATEGORY:
            return payload
        default:
            return state
    }
};

export const dailyPlansReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_DAILY_PLAN:
            return { ...state, plans: payload }
        default:
            return state
    }
};

export const weeklyPlansReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_WEEKLY_PLAN:
            return { ...state, plans: payload }
        default:
            return state
    }
};

export const monthlyPlansReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_MONTHLY_PLAN:
            return { ...state, plans: payload }
        default:
            return state
    }
};

export const yearlyPlansReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_YEARLY_PLAN:
            return { ...state, plans: payload }
        default:
            return state
    }
};

export const selectedPlanReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_PLAN:
            return { ...state, ...payload }
        default:
            return state
    }
};

export const savedPlanReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SAVE_PLAN:
            return { ...state, plans: payload }
        case ActionTypes.REMOVE_SAVE_PLAN:
            return { ...state, plans: payload }
        default:
            return state
    }
};

export const deletePlanReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.DELETE_PLAN:
            return { ...state, ...payload }
        default:
            return state
    }
};

export const addPlanReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_PLAN:
            return { ...state, ...payload }
        default:
            return state
    }
};


// bular map qilish uchun kerak