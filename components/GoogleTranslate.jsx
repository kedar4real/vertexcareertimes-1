"use client";

import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "en", name: "English", label: "EN" },
  { code: "mr", name: "Marathi", label: "MR" },
  { code: "hi", name: "Hindi", label: "HI" },
];

function triggerGoogleTranslate(langCode, attempt = 0) {
  const select = document.querySelector(".goog-te-combo");

  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  if (attempt < 20) {
    window.setTimeout(() => triggerGoogleTranslate(langCode, attempt + 1), 200);
  }
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initTranslate = () => {
      if (initializedRef.current || !window.google?.translate) return;

      initializedRef.current = true;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,mr,hi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    window.googleTranslateElementInit = initTranslate;

    if (window.google?.translate) {
      initTranslate();
    } else if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLang(language);
    setIsOpen(false);
    triggerGoogleTranslate(language.code);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 translate-widget-container" ref={dropdownRef}>
      <div id="google_translate_element" className="translate-source" />

      <div
        className={`absolute bottom-full left-0 mb-2 w-44 origin-bottom-left rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
          isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <div className="p-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                selectedLang.code === language.code
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <span className="grid h-7 w-8 place-items-center rounded-md bg-gray-100 text-[11px] font-bold text-gray-700">
                {language.label}
              </span>
              <span>{language.name}</span>
              {selectedLang.code === language.code && (
                <svg className="ml-auto h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
        type="button"
      >
        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-sm font-semibold text-gray-800">{selectedLang.name}</span>
        <svg
          className={`ml-1 h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <style jsx global>{`
        .translate-source {
          position: fixed !important;
          left: -9999px !important;
          bottom: 0 !important;
          height: 1px !important;
          width: 1px !important;
          overflow: hidden !important;
        }
        .skiptranslate.goog-te-gadget {
          font-size: 0 !important;
        }
        iframe.goog-te-banner-frame,
        #goog-gt-tt {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0 !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
