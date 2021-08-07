/* istanbul ignore next */
export default class EnvHelper {

    static validateEnv(): void {
        const incorrect = [];

        if (!EnvHelper.serverUrl) incorrect.push("GATSBY_SERVER_URL");

        if (incorrect.length > 0) {
            throw `Env config is incorrect! Incorrect fields: ${incorrect.join(", ")}`;
        }
    }

    static serverUrl = process.env.GATSBY_SERVER_URL as string;

}
