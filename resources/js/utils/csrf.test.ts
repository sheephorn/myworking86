
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initializeCsrf } from './csrf';

describe('initializeCsrf', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('calls the sanctum csrf-cookie endpoint', async () => {
        await initializeCsrf();
        expect(global.fetch).toHaveBeenCalledWith('/sanctum/csrf-cookie');
    });
});
