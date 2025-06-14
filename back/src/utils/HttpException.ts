/**
 * Custom HTTP Exception class for standardized error handling.
 */
export class HttpException extends Error {
    public status: number;
    public message: string;
    public details?: unknown; // Optional field for more detailed error info

    /**
     * Creates an instance of HttpException.
     * @param status - The HTTP status code (e.g., 400, 404, 500).
     * @param message - The error message.
     * @param details - Optional additional details about the error.
     */
    constructor(status: number, message: string, details?: unknown) {
        super(message); // Call parent constructor (Error)
        this.status = status;
        this.message = message;
        this.details = details;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}