"use client";

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import { track } from "@/lib/analytics";
import { ContactFormModal } from "./contact-form-modal";

const TOTAL_STEPS = 5;

type ContactFormState = {
  isOpen: boolean;
  currentStep: number;
  direction: number;
  name: string;
  email: string;
  project: string;
  budget: string | null;
  isSubmitted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  failureCount: number;
};

type ContactFormAction =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "ADVANCE_STEP" }
  | { type: "RETREAT_STEP" }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_EMAIL"; value: string }
  | { type: "SET_PROJECT"; value: string }
  | { type: "SET_BUDGET"; value: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string };

const initialState: ContactFormState = {
  isOpen: false,
  currentStep: 0,
  direction: 1,
  name: "",
  email: "",
  project: "",
  budget: null,
  isSubmitted: false,
  isSubmitting: false,
  submitError: null,
  failureCount: 0,
};

function reducer(
  state: ContactFormState,
  action: ContactFormAction
): ContactFormState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        currentStep: state.isSubmitted ? TOTAL_STEPS - 1 : state.currentStep,
      };
    case "CLOSE_MODAL":
      return { ...state, isOpen: false };
    case "ADVANCE_STEP": {
      // Don't advance past budget step without submitting
      if (state.currentStep === 3 && !state.isSubmitted) return state;
      // Don't advance past confirmation
      if (state.currentStep >= TOTAL_STEPS - 1) return state;
      return {
        ...state,
        currentStep: state.currentStep + 1,
        direction: 1,
      };
    }
    case "RETREAT_STEP": {
      if (state.currentStep <= 0) return state;
      // Don't retreat from confirmation
      if (state.currentStep === TOTAL_STEPS - 1 && state.isSubmitted)
        return state;
      return {
        ...state,
        currentStep: state.currentStep - 1,
        direction: -1,
      };
    }
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_EMAIL":
      return { ...state, email: action.value };
    case "SET_PROJECT":
      return { ...state, project: action.value };
    case "SET_BUDGET":
      return { ...state, budget: action.value };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, submitError: null };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        currentStep: TOTAL_STEPS - 1,
        direction: 1,
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error,
        failureCount: state.failureCount + 1,
      };
    default:
      return state;
  }
}

type ContactFormContextValue = ContactFormState & {
  openModal: () => void;
  closeModal: () => void;
  advanceStep: () => void;
  retreatStep: () => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setProject: (value: string) => void;
  setBudget: (value: string) => void;
  submit: () => Promise<void>;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return ctx;
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = useCallback(() => dispatch({ type: "OPEN_MODAL" }), []);
  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);
  const advanceStep = useCallback(
    () => dispatch({ type: "ADVANCE_STEP" }),
    []
  );
  const retreatStep = useCallback(
    () => dispatch({ type: "RETREAT_STEP" }),
    []
  );
  const setName = useCallback(
    (value: string) => dispatch({ type: "SET_NAME", value }),
    []
  );
  const setEmail = useCallback(
    (value: string) => dispatch({ type: "SET_EMAIL", value }),
    []
  );
  const setProject = useCallback(
    (value: string) => dispatch({ type: "SET_PROJECT", value }),
    []
  );
  const setBudget = useCallback(
    (value: string) => dispatch({ type: "SET_BUDGET", value }),
    []
  );

  const submit = useCallback(async () => {
    dispatch({ type: "SUBMIT_START" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          project: state.project,
          budget: state.budget,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message.");
      }

      track("form_submitted");
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (err) {
      dispatch({
        type: "SUBMIT_ERROR",
        error:
          err instanceof Error ? err.message : "Failed to send message.",
      });
    }
  }, [state.name, state.email, state.project, state.budget]);

  const value: ContactFormContextValue = {
    ...state,
    openModal,
    closeModal,
    advanceStep,
    retreatStep,
    setName,
    setEmail,
    setProject,
    setBudget,
    submit,
  };

  return (
    <ContactFormContext.Provider value={value}>
      {children}
      <ContactFormModal />
    </ContactFormContext.Provider>
  );
}
