"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import {
  useForm,
  useWatch,
  type FieldError,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { CATEGORY_META } from "@/lib/catalog";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";

const inputCls =
  "field w-full rounded-2xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 aria-[invalid=true]:border-brand-red";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-cocoa";

/** Choice controls hide the native input, so the visible card carries the ring. */
const choiceCls =
  "cursor-pointer transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-red";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: FieldError;
  optional?: boolean;
  children: (aria: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {optional && (
          <span className="ml-1.5 font-medium normal-case tracking-normal text-ink-soft">
            (optional)
          </span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-brand-red">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ initialSku }: { initialSku: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: "distributor",
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      interests: [],
      sku: initialSku,
      message: "",
    },
  });

  const enquiryType = useWatch({ control, name: "enquiryType" });
  const interests = useWatch({ control, name: "interests" }) ?? [];

  const onSubmit = handleSubmit(async (data) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  });

  const text = (field: UseFormRegisterReturn, extra?: string) =>
    ({ ...field, className: extra ? `${inputCls} ${extra}` : inputCls });

  if (status === "sent") {
    return (
      <div
        role="status"
        tabIndex={-1}
        className="rounded-[2rem] border border-brand-gold/40 bg-white/80 p-10 text-center shadow-card"
      >
        <p className="font-display text-3xl font-semibold text-cocoa">
          Sweet — it’s on its way.
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Thank you for writing to Kimico Foods. Our team will get back to you
          shortly on the details you shared.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
          className="press mt-8 rounded-full border-2 border-cocoa/25 px-6 py-3 text-sm font-semibold text-cocoa transition-[transform,border-color,color] hover:border-brand-red hover:text-brand-red"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className={labelCls}>I’m enquiring as</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              {
                value: "distributor",
                title: "Distributor & wholesale",
                sub: "Stocking, carton pricing, territories",
              },
              {
                value: "general",
                title: "General enquiry",
                sub: "Products, feedback, anything else",
              },
            ] as const
          ).map((opt) => (
            <label
              key={opt.value}
              className={`${choiceCls} rounded-2xl border-2 p-4 ${
                enquiryType === opt.value
                  ? "border-brand-red bg-brand-red/5"
                  : "border-cocoa/15 bg-white hover:border-cocoa/40"
              }`}
            >
              <input
                type="radio"
                value={opt.value}
                {...register("enquiryType")}
                className="sr-only"
              />
              <span className="block font-display text-lg font-semibold text-cocoa">
                {opt.title}
              </span>
              <span className="mt-0.5 block text-xs text-ink-soft">{opt.sub}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label="Name" error={errors.name}>
          {(aria) => (
            <input
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              {...aria}
              {...text(register("name"))}
            />
          )}
        </Field>
        <Field id="cf-company" label="Company" optional>
          {(aria) => (
            <input
              type="text"
              autoComplete="organization"
              placeholder="Business or store name"
              {...aria}
              {...text(register("company"))}
            />
          )}
        </Field>
        <Field id="cf-email" label="Email" error={errors.email}>
          {(aria) => (
            <input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              {...aria}
              {...text(register("email"))}
            />
          )}
        </Field>
        <Field id="cf-phone" label="Phone" error={errors.phone}>
          {(aria) => (
            <input
              type="tel"
              autoComplete="tel"
              placeholder="+91 …"
              {...aria}
              {...text(register("phone"))}
            />
          )}
        </Field>
        <Field id="cf-country" label="Country" error={errors.country}>
          {(aria) => (
            <input
              type="text"
              autoComplete="country-name"
              placeholder="India"
              {...aria}
              {...text(register("country"))}
            />
          )}
        </Field>
        <Field id="cf-city" label="City" error={errors.city}>
          {(aria) => (
            <input
              type="text"
              autoComplete="address-level2"
              placeholder="Ahmedabad"
              {...aria}
              {...text(register("city"))}
            />
          )}
        </Field>
      </div>

      <fieldset>
        <legend className={labelCls}>Interested products</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_META.map((c) => {
            const selected = interests.includes(c.name);
            return (
              <label
                key={c.slug}
                className={`${choiceCls} rounded-full border px-4 py-2 text-sm font-medium ${
                  selected
                    ? "border-cocoa bg-cocoa text-cream"
                    : "border-cocoa/20 bg-white text-cocoa hover:border-cocoa/50"
                }`}
              >
                <input
                  type="checkbox"
                  value={c.name}
                  {...register("interests")}
                  className="sr-only"
                />
                {c.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,14rem)_1fr]">
        <div>
          <Field id="cf-sku" label="Item code" optional>
            {(aria) => (
              <input
                type="text"
                placeholder="e.g. KM-18"
                {...aria}
                {...text(register("sku"), "font-mono uppercase")}
              />
            )}
          </Field>
          {initialSku && (
            <button
              type="button"
              onClick={() => setValue("sku", "")}
              className="-ml-1 mt-1 rounded px-1 py-1.5 text-xs font-medium text-ink-soft underline-offset-2 hover:underline"
            >
              Clear pre-filled code
            </button>
          )}
        </div>
        <Field id="cf-message" label="Message" error={errors.message}>
          {(aria) => (
            <textarea
              rows={5}
              placeholder={
                enquiryType === "distributor"
                  ? "Tell us about your market, current lines and the ranges you’d like to stock…"
                  : "How can we help?"
              }
              {...aria}
              {...text(register("message"), "resize-y")}
            />
          )}
        </Field>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-2xl border border-brand-red/40 bg-brand-red/5 px-4 py-3 text-sm font-medium text-brand-red"
        >
          We couldn’t send that enquiry just now. Please try again, or call us
          on +91 73830 06024.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="press inline-flex items-center gap-2.5 rounded-full bg-brand-red px-9 py-4 text-sm font-semibold text-white shadow-lift transition-[transform,background-color] hover:bg-brand-red-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
          />
        )}
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
