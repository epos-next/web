import { createAction } from "@reduxjs/toolkit";
import { Homework } from "../../models/homework";

export const setHomework = createAction<Homework[]>("setHomework");
export const setHomeworkLoading = createAction<boolean>("setHomeworkLoading");
export const invertHomeworkDone = createAction<number>("invertHomeworkDone");
