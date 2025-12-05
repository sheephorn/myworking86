/**
 * Initialize CSRF cookie by calling the Sanctum endpoint.
 * This ensures that subsequent requests have the XSRF-TOKEN cookie set.
 */
export const initializeCsrf = async (): Promise<void> => {
    await fetch('/sanctum/csrf-cookie');
};
