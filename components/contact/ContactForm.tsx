"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CATEGORY_META } from "@/lib/catalog";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";

const inputCls =
  "w-full rounded-2xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-cocoa focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-cocoa";
const errCls = "mt-1.5 text-xs font-medium text-brand-red";

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

  if (status === "sent") {
    return (
      <div className="rounded-[2rem] border border-brand-gold/40 bg-white/80 p-10 text-center shadow-card">
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
          className="mt-8 rounded-full border-2 border-cocoa/25 px-6 py-3 text-sm font-semibold text-cocoa transition-colors hover:border-brand-red hover:text-brand-red"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Enquiry path */}
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
              className={`cursor-pointer rounded-2xl border-2 p-4 transition-colors ${
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
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name *
          </label>
          <input id="cf-name" type="text" autoComplete="name" placeholder="Your full name" className={inputCls} {...register("name")} />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className={labelCls}>
            Company
          </label>
          <input id="cf-company" type="text" autoComplete="organization" placeholder="Business or store name" className={inputCls} {...register("company")} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email *
          </label>
          <input id="cf-email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls} {...register("email")} />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Phone *
          </label>
          <input id="cf-phone" type="tel" autoComplete="tel" placeholder="+91 …" className={inputCls} {...register("phone")} />
          {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-country" className={labelCls}>
            Country *
          </label>
          <input id="cf-country" type="text" autoComplete="country-name" placeholder="India" className={inputCls} {...register("country")} />
          {errors.country && <p className={errCls}>{errors.country.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-city" className={labelCls}>
            City *
          </label>
          <input id="cf-city" type="text" autoComplete="address-level2" placeholder="Ahmedabad" className={inputCls} {...register("city")} />
          {errors.city && <p className={errCls}>{errors.city.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Interested products</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_META.map((c) => {
            const selected = interests.includes(c.name);
            return (
              <label
                key={c.slug}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
          <label htmlFor="cf-sku" className={labelCls}>
            Item code
          </label>
          <input
            id="cf-sku"
            type="text"
            placeholder="e.g. KM-18"
            className={`${inputCls} font-mono uppercase`}
            {...register("sku")}
          />
          {initialSku && (
            <button
              type="button"
              onClick={() => setValue("sku", "")}
              className="mt-1.5 text-xs font-medium text-ink-soft underline-offset-2 hover:underline"
            >
              Clear pre-filled code
            </button>
          )}
        </div>
        <div>
          <label htmlFor="cf-message" className={labelCls}>
            Message *
          </label>
          <textarea
            id="cf-message"
            rows={5}
            placeholder={
              enquiryType === "distributor"
                ? "Tell us about your market, current lines and the ranges you’d like to stock…"
                : "How can we help?"
            }
            className={`${inputCls} resize-y`}
            {...register("message")}
          />
          {errors.message && <p className={errCls}>{errors.message.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <p className="rounded-2xl border border-brand-red/40 bg-brand-red/5 px-4 py-3 text-sm font-medium text-brand-red">
          Something went wrong sending that — please try again, or call us on
          +91 73830 06024.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-brand-red px-9 py-4 text-sm font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-red-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
