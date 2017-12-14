import Http from "../../../lib/utility/http";

abstract class Service {

    protected readonly server: any;
    protected readonly http: any;

    constructor(server: any) {
        this.server = server;
        this.http = Http;
    }

}

export default Service;
