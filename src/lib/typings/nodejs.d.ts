declare module NodeJS  {
    interface Global {
        app: {
            config: any
        }
    }    
}

declare function escape(s:string): string;
declare function unescape(s:string): string;