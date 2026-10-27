import { useState } from "react";

/**
 * Shared newsletter form state. UI confirmation only for now — there is no
 * email backend yet, so the submit just flips to the success state.
 */
export function useNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    // TODO: send the address to an email service once one is connected.
    setDone(true);
  }

  return { email, setEmail, done, onSubmit };
}
