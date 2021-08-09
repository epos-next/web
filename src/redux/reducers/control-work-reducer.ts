import {
    addControlWork,
    setControlWorks,
    setControlWorksLoading,
    setIsControlWorkCreatorOpen
} from "@redux/actions/control-work-actions";
import { AnyAction } from "redux";
import { ControlWork } from "../../models/control-work";

export type ControlWorkState = {
    controlWorks: ControlWork[],
    loading: boolean,
    isControlWorkCreatorOpen: boolean,
}

export const initialState: ControlWorkState = {
    controlWorks: [],
    loading: true,
    isControlWorkCreatorOpen: false,
}

export default (state: ControlWorkState = initialState, action: AnyAction): ControlWorkState => {

    if (addControlWork.match(action)) {
        const controlWorks = [...state.controlWorks, action.payload];
        return {
            ...state,
            controlWorks,
        }
    }

    if (setControlWorks.match(action)) {
        return {
            ...state,
            controlWorks: action.payload,
        }
    }

    if (setIsControlWorkCreatorOpen.match(action)) {
        return {
            ...state,
            isControlWorkCreatorOpen: action.payload,
        }
    }

    if (setControlWorksLoading.match(action)) {
        return {
            ...state,
            loading: action.payload,
        }
    }

    return state;
}
