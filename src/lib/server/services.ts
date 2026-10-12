
import "server-only";

import nodemailer from "nodemailer";
import { ValidationError, escapeHtml, requiredText, textToHtml } from "./forms";

const CAPTCHA_VERIFY_URL =
  "https://www.google.com/recaptcha/api/siteverify";

function requiredEnv(
  name:
    | "EMAIL_USER"
    | "EMAIL_PASSWORD"
    | "SMTP_HOST"
    | "SMTP_PORT"
    | "RECAPTCHA_SECRET_KEY"
    | "STRIPE_SECRET_KEY"
    | "NEXT_PUBLIC_URL"
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required server configuration: ${name}`);
  }

  return value;
}

export function mailTransport() {
  const port = Number(requiredEnv("SMTP_PORT"));

  if (![465, 587].includes(port)) {
    throw new Error("SMTP_PORT must be 465 or 587.");
  }

  return nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv("EMAIL_USER"),
      pass: requiredEnv("EMAIL_PASSWORD"),
    },
  });
}

export function mailRecipient() {
  return requiredEnv("EMAIL_USER");
}

/**
 * Acknowledgement sent to the visitor after a public form is submitted. A failure here is logged,
 * not thrown: the submission itself has already been stored and delivered to the team.
 */
export async function sendConfirmation({
  to,
  name,
  subject,
  intro,
  rows = [],
}: {
  to: string;
  name: string;
  subject: string;
  /** Plain text, e.g. "We've received your message and will be in touch shortly." */
  intro: string;
  /** Copy of what they sent, as label / value pairs (empty values are skipped). */
  rows?: [string, string][];
}) {
  const summary = rows
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;vertical-align:top"><strong>${escapeHtml(label)}</strong></td><td style="padding:6px 0">${textToHtml(value)}</td></tr>`)
    .join("");

  try {
    await mailTransport().sendMail({
      from: `"Visualytes" <${mailRecipient()}>`,
      to,
      subject,
      html: `<div style="font-family:Arial,sans-serif;color:#0f172a"><h2>Thanks for reaching out${name ? `, ${escapeHtml(name)}` : ""}!</h2><p>${escapeHtml(intro)}</p>${summary ? `<p><strong>Here is a copy of what you sent us:</strong></p><table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${summary}</table>` : ""}<p>Best regards,<br />Visualytes Team</p></div>`,
    });
  } catch (error) {
    console.error(`Unable to send confirmation email to ${to}`, error);
  }
}

export function applicationUrl() {
  return requiredEnv("NEXT_PUBLIC_URL").replace(/\/$/, "");
}

export function stripeSecretKey() {
  return requiredEnv("STRIPE_SECRET_KEY");
}

export async function verifyCaptcha(token: unknown) {
  const response = requiredText(token, "Robot verification token", {
    max: 4096,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const result = await fetch(CAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: requiredEnv("RECAPTCHA_SECRET_KEY"),
        response,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!result.ok) {
      throw new ValidationError("Robot verification failed.");
    }

    const data = (await result.json()) as {
      success?: boolean;
    };

    if (!data.success) {
      throw new ValidationError("Robot verification failed.");
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }

    throw new Error("Robot verification service is unavailable.");
  } finally {
    clearTimeout(timeout);
  }
}
