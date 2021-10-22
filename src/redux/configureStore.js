import { createStore } from "redux";
import { initialState } from "./reducer";

export const ConfigureStore = () => {
    const store = createStore(
        initialState
    );

    return store
}