"use client";

import { useState } from "react";

import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";

import axiosInstance from "@/lib/api/client";

type LeadPayload = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  propertyIntent: string;
};

const initialState: LeadPayload = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  propertyIntent: "",
};

export function PropertyForm() {
  const [formData, setFormData] = useState<LeadPayload>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      await axiosInstance.post("/leads", formData);
      const successMessage = "Details submitted successfully. Our team will reach out to you shortly.";
      toast.success("Submission received", {
        description: successMessage,
        className: "bg-white text-slate-900",
      });
      setMessage(successMessage);
      setFormData(initialState);
    } catch (err) {
      const friendlyMessage = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "Unable to submit details right now.")
        : "Unable to submit details right now.";
      setError(friendlyMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section bg-[radial-gradient(circle_at_top,#e9f2ff,#ffffff)]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl px-6 py-12"
      >
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <p className="text-3xl leading-tight font-semibold text-slate-900 md:text-4xl">
            Want to have a hassle-free experience?
            <br className="hidden md:block" />
            Connect with our panel of expert realtors.
          </p>
          <p className="text-base text-slate-600">
            We will match you with a local realtor or agent who knows your market best. Fill out the form below to
            request a guided product tour.
          </p>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          />

          <select
            name="propertyIntent"
            className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none md:col-span-2"
            value={formData.propertyIntent}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>
              Looking to sell or rent-out?
            </option>
            <option value="sell">Sell Property</option>
            <option value="rent">Rent Property</option>
            <option value="both">Open to both</option>
          </select>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-slate-900 py-3 text-base font-semibold tracking-wide text-white uppercase shadow-[0_15px_45px_rgba(15,15,15,0.35)] transition hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_25px_60px_rgba(15,15,15,0.3)] disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm font-medium text-emerald-600">{message}</p>}
        {error && <p className="mt-4 text-center text-sm font-medium text-rose-600">{error}</p>}

        <p className="mt-6 text-center text-xs text-slate-400">
          By submitting this form you agree that Metaron and subscribed realtor on this platform may contact you,
          including with calls or texts by automated means. You also agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </section>
  );
}
