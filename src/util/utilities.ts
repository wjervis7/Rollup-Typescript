// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatString = (str: string, ...args: any[]): string => {
    const arg = args.length === 1 && typeof(args[0] === "object") ? args[0] : args;
    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, (m, n) => {
        if(m === "{{"){
            return "{";
        }
        if(m === "}}"){
            return "}";
        }
        return arg[n];
    });
};

const trimStart = (str: string, trim: string): string => {
    const re = new RegExp(`^${trim}*`);
    return str.replace(re, "");
};

const trimEnd = (str: string, trim: string): string => {
    const re = new RegExp(`${trim}*$`);
    return str.replace(re, "");
};

export { formatString, trimStart, trimEnd };