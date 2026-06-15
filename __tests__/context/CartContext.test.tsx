// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

const p1 = { id: 'p1', title: 'Helmet', price: 49.99, image: 'helmet.jpg', category: 'PPE' };
const p2 = { id: 'p2', title: 'Gloves', price: 19.99, image: 'gloves.jpg', category: 'PPE' };

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('throws when used outside CartProvider', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider');
        consoleError.mockRestore();
    });

    it('starts with empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.items).toEqual([]);
        expect(result.current.total).toBe(0);
        expect(result.current.itemCount).toBe(0);
    });

    it('adds a new item with quantity 1', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]).toMatchObject({ ...p1, quantity: 1 });
        expect(result.current.itemCount).toBe(1);
    });

    it('increments quantity when adding the same item again', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.addItem(p1));
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.itemCount).toBe(2);
    });

    it('adds multiple different items independently', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.addItem(p2));
        expect(result.current.items).toHaveLength(2);
        expect(result.current.itemCount).toBe(2);
    });

    it('removes an item by id', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.addItem(p2));
        act(() => result.current.removeItem('p1'));
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].id).toBe('p2');
    });

    it('does nothing when removing a non-existent id', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.removeItem('nonexistent'));
        expect(result.current.items).toHaveLength(1);
    });

    it('updates item quantity', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.updateQuantity('p1', 5));
        expect(result.current.items[0].quantity).toBe(5);
        expect(result.current.itemCount).toBe(5);
    });

    it('removes item when quantity is updated to 0', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.updateQuantity('p1', 0));
        expect(result.current.items).toHaveLength(0);
    });

    it('removes item when quantity is updated to a negative number', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.updateQuantity('p1', -3));
        expect(result.current.items).toHaveLength(0);
    });

    it('calculates total correctly across multiple items and quantities', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1)); // 49.99 x1
        act(() => result.current.addItem(p2)); // 19.99 x1
        act(() => result.current.updateQuantity('p1', 2)); // 49.99 x2 = 99.98
        // total = 99.98 + 19.99 = 119.97
        expect(result.current.total).toBeCloseTo(119.97, 2);
    });

    it('clears all items', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => result.current.addItem(p1));
        act(() => result.current.addItem(p2));
        act(() => result.current.clearCart());
        expect(result.current.items).toHaveLength(0);
        expect(result.current.total).toBe(0);
        expect(result.current.itemCount).toBe(0);
    });

    it('persists cart to localStorage after adding items', async () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        await act(async () => { result.current.addItem(p1); });
        const stored = localStorage.getItem('sss-cart');
        expect(stored).not.toBeNull();
        const parsed = JSON.parse(stored!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].id).toBe('p1');
    });

    it('clears localStorage when cart is cleared', async () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        await act(async () => { result.current.addItem(p1); });
        await act(async () => { result.current.clearCart(); });
        const stored = JSON.parse(localStorage.getItem('sss-cart')!);
        expect(stored).toEqual([]);
    });

    it('loads persisted cart from localStorage on mount', async () => {
        localStorage.setItem('sss-cart', JSON.stringify([{ ...p1, quantity: 3 }]));
        const { result } = renderHook(() => useCart(), { wrapper });
        await act(async () => {});
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]).toMatchObject({ id: 'p1', quantity: 3 });
        expect(result.current.itemCount).toBe(3);
    });

    it('ignores malformed localStorage data gracefully', async () => {
        localStorage.setItem('sss-cart', 'not-valid-json{{{');
        const { result } = renderHook(() => useCart(), { wrapper });
        await act(async () => {});
        expect(result.current.items).toEqual([]);
    });
});
