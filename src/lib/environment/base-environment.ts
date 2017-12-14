import * as DotEnv from "dotenv";
import * as Path from "path";

class BaseEnvironment {

    protected readonly options: any;

    constructor(options: any) {
       this.options = options;
       this.setProcessEnv();
    }

   protected get(key: string, payload: object): any {
        return key.split(".")
                  .reduce((o, i) => o[i], payload);
    }

    private setProcessEnv(): void {
        process.env.ROOT_DIR = process.env.PWD;
        DotEnv.config({
            path: Path.join(process.env.ROOT_DIR, this.options.filename)
        });
     }
 }

export default BaseEnvironment;
