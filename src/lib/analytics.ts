type AnalyticsEvent =
  | "step_1_completed"
  | "step_2_completed"
  | "step_3_completed"
  | "step_4_completed"
  | "form_submitted";

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  // Stub: wire up to Plausible or another provider later
  // Example Plausible integration:
  // if (typeof window !== "undefined" && window.plausible) {
  //   window.plausible(event, { props: properties });
  // }
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${event}`, properties);
  }
}
