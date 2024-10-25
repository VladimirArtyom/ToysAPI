type QueryObject = {
    featured?: boolean,
    company?: string,
    name?: {$regex: string, $options: string},
    numericFilters?: string,
    sort?: string,
    fields?: string,
    [key: string] : any,
}
export {QueryObject};
