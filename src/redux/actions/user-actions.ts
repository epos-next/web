import { createAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export const setUser = createAction<User | null>("setUser");
