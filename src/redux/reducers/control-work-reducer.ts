import {
    addControlWork,
    setIdleControlWorksState,
    setLoadingControlWorksState,
    setIsControlWorkCreatorOpen
} from "@redux/actions/control-work-actions";
import { AnyAction } from "redux";
import { ControlWork } from "../../models/control-work";
import { isIdleControlWorkState } from "../../type-guards/reducers";

export type ControlWorkState = IdleControlWorkState | LoadingControlWorkState

export type IdleControlWorkState = { loading: false, controlWorks: ControlWork[] } & ControlWorkStateAddon
export type LoadingControlWorkState = { loading: true } & ControlWorkStateAddon
export type ControlWorkStateAddon =  { isControlWorkCreatorOpen: boolean }

export const initialState: ControlWorkState = {
    loading: true,
    isControlWorkCreatorOpen: false,
}

export default (state: ControlWorkState = initialState, action: AnyAction): ControlWorkState => {

    if (addControlWork.match(action) && isIdleControlWorkState(state)) {
        const controlWorks = [...state.controlWorks, action.payload];
        return {
            ...state,
            controlWorks,
        }
    }

    if (setIdleControlWorksState.match(action)) {
        return {
            ...state,
            loading: false,
            controlWorks: action.payload,
        }
    }

    if (setIsControlWorkCreatorOpen.match(action)) {
        return {
            ...state,
            isControlWorkCreatorOpen: action.payload,
        }
    }

    if (setLoadingControlWorksState.match(action)) {
        return {
            ...state,
            loading: true,
        }
    }

    return state;
}
