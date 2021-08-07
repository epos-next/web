import { createAction } from "@reduxjs/toolkit";
import { Homework } from "../../models/homework";

export const setIdleHomeworkState = createAction<Homework[]>("setIdleHomeworkState");
export const setLoadingHomeworkState = createAction("setLoadingHomeworkState");
export const invertHomeworkDone = createAction<number>("invertHomeworkDone");
