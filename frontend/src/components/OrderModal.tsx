"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productPrice?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
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
      setErrorMessage("Something went wrong! Try again");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Modal Card (White background matching sample site media_1789399560879) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[460px] bg-white rounded-xl sm:rounded-2xl px-8 py-10 sm:px-12 sm:py-12 text-center shadow-2xl text-black animate-in zoom-in-95 duration-200"
      >
        {status === "success" ? (
          <div className="py-6 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl text-black font-normal tracking-tight leading-snug">
              All set. We’ll keep you posted
            </h3>
            <p className="text-[#666666] text-xs sm:text-sm font-sans leading-relaxed">
              Launching soon. You’ll receive early access and insider updates directly in your inbox.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#777777] hover:text-black font-sans transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Subtitle */}
            <div className="space-y-2.5">
              <h2 className="font-serif text-5xl sm:text-6xl text-black font-normal tracking-tight leading-none select-none">
                Stay ahead
              </h2>
              <p className="text-[#666666] text-xs sm:text-[13px] font-sans leading-snug">
                Launching soon. Get early access <br className="hidden sm:block" />
                and insider updates
              </p>
            </div>

            {/* Underline E-mail Input */}
            <div className="pt-3 text-left">
              <input
                id="modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="E-mail"
                className="w-full pb-2.5 pt-1 bg-transparent border-b border-[#cccccc] focus:border-black text-black placeholder-[#888888] focus:outline-none transition-colors text-sm font-sans"
              />
              {status === "error" && (
                <p className="text-red-600 text-xs mt-1.5 font-sans">{errorMessage}</p>
              )}
            </div>

            {/* Black Notify me Button */}
            <div className="pt-2 space-y-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 bg-black hover:bg-neutral-900 text-white font-medium rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-sans cursor-pointer disabled:opacity-50 tracking-tight"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Notify me &nbsp;•</span>
                )}
              </button>

              {/* Close Link */}
              <div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#777777] hover:text-black font-sans transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
