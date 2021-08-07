import { createAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export const setUserIdleState = createAction<User>("setUserIdleState");
