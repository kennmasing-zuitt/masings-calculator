// The name of the "drawer" in localStorage where we keep our state
const STORAGE_KEY = "redux-calculator-state";

export function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === null) return undefined; // nothing saved yet -> use initialState
        return JSON.parse(saved);
    } catch (error) {
        console.warn("Could not load saved state", error);
        return undefined;
    }
}

export function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn("Could not save state", error);
    }
}
