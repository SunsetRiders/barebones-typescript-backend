class Toolkit {

    public static getIp(req: any): string {
        let ipAddr = req.header("x-forwarded-for");
        if (!ipAddr) {
            ipAddr = req.header("cf-connecting-ip");
            if (!ipAddr) {
                ipAddr = req.connection.remoteAddress;
            }
        }
        return ipAddr;
    }

    public static cleanQueryStringAndHashtagFromUrl(url: string): string {
        // Without ? and #
        return url.split(/[?#]/)[0];
    }

    public static urlToArray(url: string): string[] {
        const arrUri = Toolkit.cleanQueryStringAndHashtagFromUrl(url).split("/");
        const urls = [];
        for (const pos of  arrUri) {
            if (pos !== "") {
                urls.push(pos.toLowerCase());
            }
        }
        return urls;
    }

    public static isEmpty(obj): boolean {
        const hasOwnProperty = Object.prototype.hasOwnProperty;
        // null and undefined are "empty"
        if (obj == null) {
            return true;
        }

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) {
            return false;
        }
        if (obj.length === 0)  {
            return true;
        }

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") {
            return true;
        }

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (const key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }

        return true;
    }

    public static arrayToStringWithComma(arr: string[] = [], finalWhiteSpace: boolean = true): string {
        return ((finalWhiteSpace) ? arr.join(", ") : arr.join(","));
    }

    public static arrayToString(arr: string[] = [], finalWhiteSpace: boolean = true): string {
        return ((finalWhiteSpace) ? arr.join(" ") : arr.join(""));
    }
}

export default Toolkit;
