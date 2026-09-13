"use client";

import React, { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productPrice?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  productPrice = "$300",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "preorder" }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl text-white">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 transition-colors rounded-full hover:bg-neutral-800"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-serif tracking-tight font-medium text-white">
              All set. We’ll keep you posted
            </h3>
            <p className="text-neutral-400 text-sm">
              Thank you for reserving your Nota One. You’ll receive early access and launch updates directly in your inbox.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <span className="inline-block text-xs uppercase tracking-widest text-neutral-500 font-mono">
                Reservation • {productPrice}
              </span>
              <h2 className="text-3xl font-serif tracking-tight font-medium text-white">
                Stay ahead
              </h2>
              <p className="text-neutral-400 text-sm">
                Launching soon. Get early access and insider updates.
              </p>
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="modal-email" className="text-xs text-neutral-400 font-mono">
                Your email address
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors text-sm"
              />
              {status === "error" && (
                <p className="text-rose-400 text-xs mt-1">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting to Strapi...</span>
                </>
              ) : (
                <span>Notify me</span>
              )}
            </button>

            <p className="text-neutral-500 text-xs">
              Saved securely to Strapi CMS with instant validation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
