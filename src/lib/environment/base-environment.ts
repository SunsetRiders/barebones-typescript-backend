import * as DotEnv from "dotenv";
import * as Path from "path";

class BaseEnvironment {

    protected readonly options: any;

    constructor(options: any) {
       this.options = options;
    }

    public setProcessEnv(): this {
        process.env.ROOT_DIR = process.env.PWD;
        DotEnv.config({
            path: Path.join(process.env.ROOT_DIR, this.options.filename)
        });
        return this;
     }
 }

export default BaseEnvironment;
