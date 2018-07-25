import {Server, AsService} from '@barteh/as-service';

class services {

    static instance;

    constructor() {
        if (services.instance) {
            return services.instance;
        }

        services.instance = this;
    }
    useraction = {
        userinfo: new AsService(() => Server.controller("useraction", "fulluserinfo"), d => d.data, true),
        
    }

}

export default new services();