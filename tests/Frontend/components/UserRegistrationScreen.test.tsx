import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserRegistrationScreen from '@/components/UserRegistrationScreen';

// Mock fetch
const fetchMock = vi.fn();
global.fetch = fetchMock;

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
    value: {
        randomUUID: () => 'test-uuid-1234'
    }
});

describe('UserRegistrationScreen', () => {
    beforeEach(() => {
        fetchMock.mockClear();
        fetchMock.mockResolvedValue({
            ok: true,
            json: async () => ({
                user: {
                    id: 'test-uuid-1234',
                    name: 'TestUser',
                    grade: 1
                }
            })
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the form correctly', () => {
        render(<UserRegistrationScreen onComplete={() => { }} />);

        expect(screen.getByLabelText(/ニックネーム/)).toBeDefined();
        expect(screen.getByLabelText(/がくねん/)).toBeDefined();
        expect(screen.getByRole('button', { name: 'はじめる！' })).toBeDefined();
    });

    it('submits the form to the API and calls onComplete on success', async () => {
        const onComplete = vi.fn();
        render(<UserRegistrationScreen onComplete={onComplete} />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/ニックネーム/), { target: { value: 'TestUser' } });
        fireEvent.change(screen.getByLabelText(/がくねん/), { target: { value: '1' } });

        // Submit
        const button = screen.getByRole('button', { name: 'はじめる！' });
        expect(button.disabled).toBe(false);
        fireEvent.click(button);

        // Verify loading state (optional, if implemented)
        // expect(screen.getByText('Loading...')).toBeDefined();

        // Verify API call
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('/api/user', expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    id: 'test-uuid-1234',
                    name: 'TestUser',
                    grade: 1
                })
            }));
        });

        // Verify onComplete call
        await waitFor(() => {
            expect(onComplete).toHaveBeenCalledWith({
                id: 'test-uuid-1234',
                nickname: 'TestUser',
                grade: 1
            });
        });
    });

    it('displays an error message when API call fails', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({ message: 'Server Error' })
        });

        const onComplete = vi.fn();
        render(<UserRegistrationScreen onComplete={onComplete} />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText(/ニックネーム/), { target: { value: 'TestUser' } });
        fireEvent.change(screen.getByLabelText(/がくねん/), { target: { value: '1' } });

        // Submit
        fireEvent.click(screen.getByRole('button', { name: 'はじめる！' }));

        // Verify error message
        await waitFor(() => {
            expect(screen.queryByText('Server Error')).not.toBeNull();
        });

        expect(onComplete).not.toHaveBeenCalled();
    });
});
