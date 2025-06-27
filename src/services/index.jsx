import { getEnv } from "../libraries/Enviroment";
import CalendarAPI from "./Calendar";

const config = {
    baseurl: getEnv('VITE_API_BASEURL'),
};

export const service = {

    config: {
        baseurl: `${config.baseurl}`,
    },

    //context: HttpContext,

    services: {

        Calendar: CalendarAPI(config)

    }

}; export default service;