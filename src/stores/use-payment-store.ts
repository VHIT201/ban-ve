import { PaymentSseEvent } from "@/enums/payment";

export type PaymentStatus =
  | "IDLE"
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "EXPIRED";

export interface PaymentSession {
  paymentId: string;
  sseClientId: string;
  order: Order;

  status: PaymentStatus;
  isConnected: boolean;

  lastEvent: PaymentSseEvent | null;
  events: PaymentSseEvent[];
}

interface States {
  sessions: PaymentSession[];
}

interface Actions {
  findExistsOrder: (order: Order) => PaymentSession | undefined;

  createPayment: (payload: {
    sseClientId: string;
    paymentId: string;
    order: Order;
  }) => void;

  updateConnection: (paymentId: string, isConnected: boolean) => void;

  handleSseEvent: (paymentId: string, event: PaymentSseEvent) => void;

  removePayment: (paymentId: string) => void;
  resetStore: () => void;
}

const INITIAL_STATES: States = {
  sessions: [],
};

import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PaymentSseEventType } from "@/enums/payment";
import { createStorage } from "@/utils/storage";
import { Order } from "@/api/models";
import { isOrderEqual } from "@/utils/order";

type Store = States & Actions;

const paymentStore: StateCreator<Store> = (set, get) => ({
  ...INITIAL_STATES,

  findExistsOrder: (order: Order) => {
    return get().sessions.find((s) => isOrderEqual(s.order, order));
  },

  createPayment: ({ sseClientId, paymentId, order }) =>
    set((state) => ({
      sessions: [
        ...state.sessions,
        {
          sseClientId,
          paymentId,
          order,
          status: "PENDING",
          isConnected: false,
          lastEvent: null,
          events: [],
        },
      ],
    })),

  updateConnection: (paymentId, isConnected) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.paymentId === paymentId ? { ...s, isConnected } : s
      ),
    })),

  handleSseEvent: (paymentId, event) =>
    set((state) => ({
      sessions: state.sessions.map((s) => {
        if (s.paymentId !== paymentId) return s;

        let nextStatus = s.status;

        switch (event.type) {
          case PaymentSseEventType.PAYMENT_SUCCESS:
            nextStatus = "SUCCESS";
            break;
          case PaymentSseEventType.PAYMENT_FAILED:
            nextStatus = "FAILED";
            break;
          case PaymentSseEventType.PAYMENT_EXPIRED:
            nextStatus = "EXPIRED";
            break;
        }

        return {
          ...s,
          status: nextStatus,
          lastEvent: event,
          events: [...s.events, event],
        };
      }),
    })),

  removePayment: (paymentId) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.paymentId !== paymentId),
    })),

  resetStore: () => set(INITIAL_STATES),
});

type PaymentPersistedState = {
  sessions: Array<Pick<PaymentSession, "paymentId" | "order" | "status">>;
};

const usePaymentStore = create<Store>()(
  devtools(
    persist(paymentStore, {
      name: "payment-store",
      storage: createStorage<PaymentPersistedState>(),
      partialize: (state) => ({
        sessions: state.sessions.map(({ paymentId, order, status }) => ({
          paymentId,
          order,
          status,
        })),
      }),
    })
  )
);

export default usePaymentStore;
