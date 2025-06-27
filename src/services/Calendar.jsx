import { z } from 'zod';

export default function CalendarAPI(config) {
    
    return {

        //context: ApiContext,
        config: {
            baseurl: `${config.baseurl}/calendar`,
        },
        
        methods: {

            CreateEvent: {
                url: "/",
                method: "POST",
                data: z.object({
                }),
            },

            UpdateEvent: {
                url: "/{id}",
                method: "PUT",
                params: z.object({
                    id: z.number().positive().optional(),
                }),
                data: z.object({
                }),
            },

            GetEvent: {
                url: "/{id}",
                method: "GET",
                params: z.object({
                    id: z.number().positive().optional(),
                })
            },

            DeleteEvent: {
                url: "/{id}",
                method: "DELETE",
                params: z.object({
                    id: z.number().positive().optional(),
                })
            },

            ListEvents: {
                url: "/",
                method: "GET",
                data: z.object({
                    year: z.number(),
                })
            },

            SearchEvents: {
                url: "/search",
                method: "GET",
                data: z.object({
                    q: z.string(),
                })
            },

        }
    
    }
}