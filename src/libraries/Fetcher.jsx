const defaultSettings = { baseurl: "/", headers: {"Content-type": "application/json;charset=UTF-8"} };

export class HttpClient {

    settings = null

    constructor(settings=defaultSettings) {
        settings = settings || {};
        this.settings = {...defaultSettings, ...settings};
    }

    setHeaders(headers, merge=true) {

        if(typeof headers != "object" || typeof headers.length === "number") {
            throw new Error(`invalid headers!`);
        } 
        
        if (merge === true) {
            this.settings = { ...this.settings, headers: {...this.settings.headers, ...headers } };
        } else {
            this.settings = { ...this.settings, headers: { ...headers } };
        }

    }
    
    async fetch(url, options={}) {

        const { baseurl, headers } = this.settings;
        if(typeof baseurl !== "string") {
            throw new Error(`Invalid baseurl ${baseurl}`);
        }

        let data = JSON.stringify(options.data||{});
        const blacklist = ["GET", "HEAD"];

        if(blacklist.indexOf(options.method.toUpperCase()) !== -1) {
            data = undefined;
        }

        let response = null;

        try {
            
            response = await window.fetch(`${baseurl}${url}`, {
                method: options.method,
                body: data,
                headers: { ...headers, ...options.headers }
            });

            if (!response.ok) {
                const text = await response.json()
                return { status: response.status, ...text }
            }

            const json = await response.json();
            return { status: response.status, response: json }

        } catch (err) {
            return { status: response.status, detail: err }
        }

    }

    post(url, data={}) { return this.fetch(url, { method: "POST", data }); }
    put(url, data={}) { return this.fetch(url, { method: "PUT", data }); }
    patch(url, data={}) { return this.fetch(url, { method: "PATCH", data }); }
    get(url) { return this.fetch(url, { method: "GET" }); }
    delete(url, data={}) { return this.fetch(url, { method: "DELETE", data }); }

}

export class HttpService {
    
    static _http = null;
    static _services = null;
    
    constructor(settings) {

        this._settings = settings;
        const { config, services } = this._settings;

        HttpService._services = {};
        HttpService._http = new HttpClient(config);
        Object.keys(services).map((serviceName) => {
            HttpService._services[serviceName] = HttpService
                .buildService(services[serviceName].config ? 
                    new HttpClient(services[serviceName].config) : HttpService._http, 
                    services[serviceName]
                );
        });

        return HttpService._services;

    }

    static buildService(http, serviceDef) {

        const service = {};
        const { methods } = serviceDef;
        Object.keys(methods).map((methodName) => {
            
            const method = methods[methodName];
            
            service[methodName] = async (...args) => {
                
                let data = undefined;
                let _is_object = false;
                if(args.length === 1) {
                    if(typeof args[0] === "object" 
                    && typeof args[0].length == "undefined") {
                        args = args[0];
                        _is_object = true;
                    }
                }

                let paramNames = null;
                let _is_zod = typeof (method.data||{}).parse === "function";
                if(_is_zod) {
                    paramNames = Object.keys(method.data.strict().shape)
                } else {
                    paramNames = Object.keys(method.data||{});
                }
                    
                if (!_is_object && args.length !== paramNames.length) {
                    const msg = paramNames.length ? `"${paramNames.join('", "')}"` : ""
                    throw new Error(`Invalid invocation${msg ? `, params required: ${msg}` : ', method accepts no params!' } `)
                }

                if (!_is_zod && paramNames.length) { 
                    data = {};
                    paramNames.map((param, i) => {
                        data[param] = args[_is_object ? param : i] !== undefined ? args[_is_object ? param: i] : data[param];
                    }); _is_object = true;
                } 
                
                if(_is_object && _is_zod) { data = method.data.parse(args); }
                
                return await http.fetch(`${method.url}`, { method: method.method, data })

            };
            
        }); return service;

    }

}


export default { HttpClient, HttpService };