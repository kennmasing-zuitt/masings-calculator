import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./features/calculator/calculatorSlice";
import pbbBbkCalculatorReducer from "./features/calculator/pbbBbkCalculatorSlice";

// A function that builds a NEW store each time it is called.
// Next.js runs on a server too, so we never share one global store.
export function makeStore() {
    return configureStore({
        reducer: {
            calculator: calculatorReducer,
            pbbBbkCalculator: pbbBbkCalculatorReducer,
        },
    });
}
