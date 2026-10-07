import { createSlice, current, nanoid } from "@reduxjs/toolkit";

// 1. What the calculator looks like the very first time it opens
const initialState = {
    current: "0", // the big number on the screen
    previous: null, // the number typed before the operator
    operator: null, // '+', '−', '×' or '÷'
    overwrite: false, // true = the next digit starts a fresh number
    history: [], // every computation: { id, expression, result, createdAt }
};

// 2. A plain helper that does the math (no Redux here)
function calculate(a, b, operator) {
    const x = parseFloat(a);
    const y = parseFloat(b);
    let result;
    switch (operator) {
        case "+":
            result = x + y;
            break;
        case "−":
            result = x - y;
            break;
        case "×":
            result = x * y;
            break;
        case "÷":
            if (y === 0) return "Error";
            result = x / y;
            break;
        default:
            return b;
    }
    // Fix floating-point noise: 0.1 + 0.2 = 0.30000000000000004 -> 0.3
    return String(parseFloat(result.toPrecision(12)));
}

// 3. Records one computation into history and puts the result on screen
function runComputation(state, id, createdAt) {
    const result = calculate(state.previous, state.current, state.operator);
    state.history.push({
        id,
        expression: `${state.previous} ${state.operator} ${state.current}`,
        result,
        createdAt,
    });
    return result;
}

// Gives every history entry a unique id and a time stamp.
// This runs BEFORE the reducer, so the reducer stays "pure".
const withIdAndTime = (payload) => ({
    payload: {
        value: payload,
        id: nanoid(),
        createdAt: new Date().toISOString(),
    },
});

const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        digitPressed(state, action) {
            const digit = action.payload;
            if (state.overwrite) {
                state.current = digit === "." ? "0." : digit;
                state.overwrite = false;
                return;
            }
            if (digit === "." && state.current.includes(".")) return;
            if (state.current.length >= 16) return;
            state.current =
                state.current === "0" && digit !== "."
                    ? digit
                    : state.current + digit;
        },

        operatorPressed: {
            reducer(state, action) {
                const { value: operator, id, createdAt } = action.payload;
                if (state.current === "Error") return;

                // 5 + 3 then "×"  -> work out 5 + 3 first, then keep going
                if (
                    state.operator &&
                    state.previous !== null &&
                    !state.overwrite
                ) {
                    const result = runComputation(state, id, createdAt);
                    if (result === "Error") {
                        Object.assign(state, {
                            current: "Error",
                            previous: null,
                            operator: null,
                            overwrite: true,
                        });
                        return;
                    }
                    state.previous = result;
                    state.current = result;
                } else if (!state.operator || !state.overwrite) {
                    state.previous = state.current;
                }
                state.operator = operator;
                state.overwrite = true;
            },
            prepare: withIdAndTime,
        },

        equalsPressed: {
            reducer(state, action) {
                const { id, createdAt } = action.payload;
                if (!state.operator || state.previous === null) return;
                state.current = runComputation(state, id, createdAt);
                state.previous = null;
                state.operator = null;
                state.overwrite = true;
            },
            prepare: () => withIdAndTime(null),
        },

        // Puts back the state we saved in localStorage (runs once, in the browser)
        stateRestored(state, action) {
            return { ...initialState, ...action.payload };
        },

        // The ONLY action that wipes everything, including the history
        clearPressed() {
            return initialState;
        },
    },
});

export const {
    digitPressed,
    operatorPressed,
    equalsPressed,
    stateRestored,
    clearPressed,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;

// Selectors: small functions that read a piece of the state
export const selectDisplay = (state) => state.calculator;
export const selectHistory = (state) => state.calculator.history;
