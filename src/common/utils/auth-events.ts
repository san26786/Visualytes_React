/** Fired on window after a sign-in / sign-out so client UI (the header button) re-checks the session. */
export const AUTH_CHANGED_EVENT = "visualytes:auth-changed";

export function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}
