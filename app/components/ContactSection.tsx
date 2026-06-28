"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const initialFormValues = {
  name: "",
  email: "",
  message: "",
};

export default function ContactSection() {
  const { t } = useLanguage();
  const googleAppsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfirming) {
      setIsConfirming(true);
      setSubmitStatus("idle");
      return;
    }

    if (!googleAppsScriptUrl || submitStatus === "sending") {
      return;
    }

    setSubmitStatus("sending");

    try {
      const body = new URLSearchParams();
      body.set("name", formValues.name);
      body.set("email", formValues.email);
      body.set("message", formValues.message);

      await fetch(googleAppsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setHasSubmitted(true);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleEdit = () => {
    setHasSubmitted(false);
    setIsConfirming(false);
    setSubmitStatus("idle");
  };

  const buttonLabel = isConfirming ? t.contact.confirm : t.contact.submit;
  const formStage = hasSubmitted
    ? "submitted"
    : isConfirming
      ? "confirm"
      : "input";

  return (
    <section id="contact" className="flex flex-col md:min-h-dvh md:flex-row">
      <div className="relative flex w-full items-center bg-white px-15 md:w-[59.7%] md:px-16 md:py-0 xl:pr-48">
        <div className="flex w-full flex-col gap-8">
          <h2 className="font-display text-[50px] leading-none tracking-[0.06em] md:text-[90px]">
            CONTACT
          </h2>

          <p className="text-sm">{t.contact.lead}</p>

          <form
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div
              key={formStage}
              className={`contact-form-fields flex w-full flex-col gap-6 ${
                hasSubmitted ? "contact-success-enter" : "contact-fade-enter"
              }`}
            >
              <label className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <span className="w-20 shrink-0 text-sm text-[#868686]">
                  {t.contact.name}
                </span>
                {isConfirming ? (
                  <p className="min-h-10 w-full flex-1 border border-transparent px-0 py-2 text-sm">
                    {formValues.name}
                  </p>
                ) : (
                  <input
                    className="min-h-10 w-full flex-1 border border-[#a9a9a9] px-2 text-sm transition-colors outline-none focus:border-[#393a47]"
                    name="name"
                    type="text"
                    placeholder={t.contact.namePlaceholder}
                    required
                    value={formValues.name}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                )}
              </label>

              <label className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <span className="w-20 shrink-0 text-sm text-[#868686]">
                  {t.contact.email}
                </span>
                {isConfirming ? (
                  <p className="min-h-10 w-full flex-1 border border-transparent px-0 py-2 text-sm">
                    {formValues.email}
                  </p>
                ) : (
                  <input
                    className="min-h-10 w-full flex-1 border border-[#a9a9a9] px-2 text-sm transition-colors outline-none focus:border-[#393a47]"
                    name="email"
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                )}
              </label>

              <label className="flex flex-col items-start gap-4 md:flex-row">
                <span className="mt-2 w-20 shrink-0 text-sm text-[#868686]">
                  {t.contact.message}
                </span>
                {isConfirming ? (
                  <p className="min-h-55 w-full flex-1 border border-transparent px-0 py-2 text-sm whitespace-pre-wrap">
                    {formValues.message}
                  </p>
                ) : (
                  <textarea
                    className="min-h-55 w-full flex-1 resize-none border border-[#a9a9a9] p-2 text-sm transition-colors outline-none focus:border-[#393a47]"
                    name="message"
                    required
                    value={formValues.message}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                  />
                )}
              </label>
            </div>

            {isConfirming && (
              <>
                <input type="hidden" name="name" value={formValues.name} />
                <input type="hidden" name="email" value={formValues.email} />
                <input
                  type="hidden"
                  name="message"
                  value={formValues.message}
                />
              </>
            )}

            {!googleAppsScriptUrl && (
              <p className="text-xs text-red-600">{t.contact.missingUrl}</p>
            )}

            {submitStatus === "sending" && (
              <div
                className="contact-fade-enter flex items-center gap-3 border border-[#393a47] bg-white px-4 py-3"
                aria-live="polite"
              >
                <span className="size-2 shrink-0 animate-pulse rounded-full bg-[#393a47]" />
                <p className="text-sm">{t.contact.sending}</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className="contact-fade-enter flex items-center gap-3 border border-red-600 bg-white px-4 py-3 text-red-600"
                aria-live="assertive"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-red-600 text-sm leading-none">
                  !
                </span>
                <p className="text-sm">{t.contact.failed}</p>
              </div>
            )}

            {submitStatus === "success" && (
              <div
                className="contact-fade-enter flex items-center gap-3 border border-[#393a47] bg-white px-4 py-3"
                aria-live="polite"
              >
                <span className="contact-check-mark flex size-7 shrink-0 items-center justify-center rounded-full border border-[#393a47] text-sm leading-none">
                  ✓
                </span>
                <p className="text-sm">{t.contact.complete}</p>
              </div>
            )}

            <div className="flex flex-col justify-end gap-3 md:flex-row">
              {isConfirming && !hasSubmitted && (
                <button
                  className="w-full border border-[#393a47] bg-white px-10 py-1.5 text-sm text-[#393a47] transition-colors hover:bg-[#393a47] hover:text-white disabled:cursor-not-allowed disabled:border-[#a9a9a9] disabled:bg-[#eeeeee] disabled:text-[#868686] disabled:hover:bg-[#eeeeee] disabled:hover:text-[#868686] md:w-auto"
                  disabled={submitStatus === "sending"}
                  type="button"
                  onClick={handleEdit}
                >
                  {t.contact.edit}
                </button>
              )}
              {!hasSubmitted && (
                <button
                  className="w-full border border-[#393a47] bg-[#393a47] px-10 py-1.5 text-sm text-white transition-colors hover:bg-white hover:text-[#393a47] disabled:cursor-not-allowed disabled:border-[#a9a9a9] disabled:bg-[#eeeeee] disabled:text-[#868686] disabled:hover:bg-[#eeeeee] disabled:hover:text-[#868686] md:w-auto"
                  disabled={!googleAppsScriptUrl || submitStatus === "sending"}
                  type="submit"
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <p className="font-display pb-6 text-center text-sm leading-none md:hidden">
        ©UMIA
      </p>
    </section>
  );
}
