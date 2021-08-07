import { createAction } from "@reduxjs/toolkit";
import { Marks } from "../../models/marks";

export const setMarks = createAction<Marks>("setMarks");
