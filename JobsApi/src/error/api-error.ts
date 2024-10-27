class APIError extends Error {
    
    constructor(message: string) {
        super(message)
    }

    getStatusCode(): number {
        return 500;
    }

}

export default APIError;
