import 'normalize.css';
import "./src/styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import EnvHelper from "./src/helpers/env-helper";
import wrapper from "./src/redux/wrapper";

EnvHelper.validateEnv();

export const wrapRootElement = wrapper;

