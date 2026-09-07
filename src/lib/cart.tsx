import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Personalization payload captured at add-to-cart time. */
export interface Personalization {
  recipient: string;
  name: string;
  date: string;
  message: string;
  language: string;
  instructions: string;
  photoName?: string;
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  price: number;
  quantity: number;
  personalization: Personalization;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "keepsake-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    setItems((current) => [
      ...current,
      { ...item, key: `${item.productId}-${Date.now()}` },
    ]);
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.min(20, Math.max(1, quantity)) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    return { items, count, subtotal, addItem, updateQuantity, removeItem, clear };
  }, [items, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
