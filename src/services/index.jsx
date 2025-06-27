import CalendarAPI from "./Calendar";

const config = {
    baseurl: "http://localhost:5000/server.php/api",
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