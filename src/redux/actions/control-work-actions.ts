import { createAction } from "@reduxjs/toolkit";
import { ControlWork } from "../../models/control-work";

export const addControlWork = createAction<ControlWork>("addControlWork")
export const setIdleControlWorksState = createAction<ControlWork[]>("setIdleControlWorksState");
export const setLoadingControlWorksState = createAction("setLoadingControlWorksState");
export const setIsControlWorkCreatorOpen = createAction<boolean>("setIsControlWorkCreatorOpen");
