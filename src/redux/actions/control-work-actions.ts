import { createAction } from "@reduxjs/toolkit";
import { ControlWork } from "../../models/control-work";

export const addControlWork = createAction<ControlWork>("addControlWork")
export const setControlWorks = createAction<ControlWork[]>("setControlWorks");
export const setControlWorksLoading = createAction<boolean>("setControlWorksLoading");
export const setIsControlWorkCreatorOpen = createAction<boolean>("setIsControlWorkCreatorOpen");
