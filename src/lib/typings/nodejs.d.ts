declare module NodeJS  {
    interface Global {}    
}

declare function escape(s:string): string;
declare function unescape(s:string): string;