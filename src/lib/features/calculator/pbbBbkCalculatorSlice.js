import { createSlice, nanoid, current } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

// 1. What the calculator looks like the very first time it opens
const initialState = {
    current: null,    // the product selected: '0'
    previous: null,   // the number typed before the operator
    overwrite: false, // true = the next selection is a new product, if no previous is selected then nothing should be pushed to history
    history: [],      // every computation: { id, expression, result, createdAt }
    quantity: null,
}

const products = [
    {
        key: "pbbRegWhite",
        label: "PBB Regular (White)",
        price: 45
    },
    {
        key: "pbbSpecWhite",
        label: "PBB Special (White)",
        price: 55
    },
    {
        key: "pbbRegMusco",
        label: "PBB Regular (Musco)",
        price: 55
    },
    {
        key: "pbbSpecMusco",
        label: "PBB Special (Musco)",
        price: 65
    },
    {
        key: "bibingka",
        label: "Bibingka",
        price: 75
    },
    {
        key: "pbbRegWhiteLecheFlan",
        label: "PBB Regular (White - Leche Flan)",
        price: 65
    },
    {
        key: "pbbSpecWhiteLecheFlan",
        label: "PBB Special (White - Leche Flan)",
        price: 75
    },
    {
        key: "pbbRegMuscoLecheFlan",
        label: "PBB Regular (Musco - Leche Flan)",
        price: 75
    },
    {
        key: "pbbSpecMuscoLecheFlan",
        label: "PBB Special (Musco - Leche Flan)",
        price: 85
    },
    {
        key: "pbbOverloadWhite",
        label: "PBB Overload (White)",
        price: 85
    },
    {
        key: "pbbOverloadMusco",
        label: "PBB Overload (Musco)",
        price: 95
    },
    {
        key: "addCheese",
        label: "Add Cheese",
        price: 10
    },
    {
        key: "addMilk",
        label: "Add Milk",
        price: 10
    },
    {
        key: "addNiyog",
        label: "Add Niyog",
        price: 10
    },
]

// 2. A plain helper that does the math (no Redux here)
function calculate(product, quantity) {
  if (!quantity) return;
  
  const parsedQuantity = parseFloat(quantity);
  const productFound = products.find((p) => p.key === product)

  if (isEmpty(productFound)) return 'Error';
  return (productFound.price * parsedQuantity).toFixed(2);
}

// 3. Records one computation into history and puts the result on screen


// Gives every history entry a unique id and a time stamp.
// This runs BEFORE the reducer, so the reducer stays "pure".
const withIdAndTime = (payload) => {
  return ({
  payload: { value: payload, id: nanoid(), createdAt: new Date().toISOString() },
})
}

const pbbBbkCalculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    
    productPressed(state, action) {
      const product = action.payload
      state.current = product
    },

    submitPressed: {
      reducer(state, action) {
        const { value: quantity, id, createdAt } = action.payload

        // Accept either a product object ({ key }) or a plain key string
        const productKey = state.current?.key ?? state.current
        const product = products.find((p) => p.key === productKey);

        if (quantity === 0) {
            const index = state.history.findIndex((h) => h.product === productKey);
            state.history.splice(index, 1)
            return
        }

        if (!productKey || !quantity) {
          console.warn('submitPressed skipped:', { productKey, quantity })
          return
        }

        const result = calculate(productKey, quantity)
        const existingProduct = state.history.find((p) => p.product === productKey)

        if (isEmpty(existingProduct)) {
          state.history.push({
            id,
            product: productKey,
            quantity: Number(quantity),
            expression: `${product.label} x ${quantity}`,
            result,
            createdAt,
          })
        } else {
            existingProduct.quantity = Number(quantity);
            existingProduct.expression = `${product.label} x ${quantity}`;
            existingProduct.result = result;
            existingProduct.createdAt = createdAt
        }

        state.current = null
        state.quantity = null
        state.overwrite = true
      },
      prepare: withIdAndTime,
    },

    operatorPressed: {
      reducer(state, action) {
        const { value: operator, id, createdAt } = action.payload
        if (state.current === 'Error') return

        // 5 + 3 then "×"  -> work out 5 + 3 first, then keep going
        if (state.operator && state.previous !== null && !state.overwrite) {
          // const result = runComputation(state, id, createdAt)
          if (result === 'Error') {
            Object.assign(state, { current: 'Error', previous: null, operator: null, overwrite: true })
            return
          }
          state.previous = result
          state.current = result
        } else if (!state.operator || !state.overwrite) {
          state.previous = state.current
        }
        state.operator = operator
        state.overwrite = true
      },
      prepare: withIdAndTime,
    },

    equalsPressed: {
      reducer(state, action) {
        const { id, createdAt } = action.payload
        if (!state.quantity || state.previous === null) return
        state.current = runComputation(state, id, createdAt)
        state.previous = null
        state.operator = null
        state.overwrite = true
      },
      prepare: () => withIdAndTime(null),
    },

    // Puts back the state we saved in localStorage (runs once, in the browser)
    stateRestored(state, action) {
      return { ...initialState, ...action.payload }
    },

    // The ONLY action that wipes everything, including the history
    clearPressed() {
      return initialState
    },
  },
})

export const { productPressed, operatorPressed, equalsPressed, stateRestored, clearPressed, submitPressed } =
  pbbBbkCalculatorSlice.actions
export default pbbBbkCalculatorSlice.reducer

// Selectors: small functions that read a piece of the state
export const selectDisplay = (state) => state.pbbBbkCalculator // store name?
export const selectHistory = (state) => state.pbbBbkCalculator.history // store name and ??
