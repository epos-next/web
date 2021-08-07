import { createAction } from "@reduxjs/toolkit";
import { Marks } from "../../models/marks";

export const setIdleMarksState = createAction<Marks>("setIdleMarksState");
export const setLoadingMarksState = createAction("setLoadingMarksState");
