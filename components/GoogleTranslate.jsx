"use client";

import { useEffect, useState, useRef } from "react";

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "mr", name: "Marathi (मराठी)", flag: "🇮🇳" },
    { code: "hi", name: "Hindi (हिंदी)", flag: "🇮🇳" },
  ];

  useEffect(() => {
    // Add Google Translate script
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
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

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode, langName) => {
    setSelectedLang(langName);
    setIsOpen(false);

    // Find the hidden Google Translate select dropdown and trigger it
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 translate-widget-container" ref={dropdownRef}>
      {/* Hidden original translate element */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Custom Dropdown Menu */}
      <div 
        className={`absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-200 origin-bottom-left ${
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="p-2 space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code, lang.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                selectedLang === lang.name
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              {lang.name}
              {selectedLang === lang.name && (
                <svg className="w-4 h-4 ml-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 shadow-md hover:shadow-lg hover:bg-gray-50 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent active:scale-95"
      >
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-sm font-semibold text-gray-800">
          {selectedLang === "English" ? "Select Language" : selectedLang.split(" ")[0]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ml-1 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Global CSS to suppress any Google UI pollution */}
      <style jsx global>{`
        /* Deep hide the Google Translate widget completely */
        .skiptranslate.goog-te-gadget {
          display: none !important;
        }
        iframe.goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        #goog-gt-tt {
          display: none !important;
          visibility: hidden !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
