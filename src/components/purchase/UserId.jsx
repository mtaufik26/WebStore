import React, { useState } from "react";
import { HelpCircle, UserCheck, X, Info, ShieldCheck } from "lucide-react";

const UserId = ({ idFields, formData, handleInputChange, guide, categoryTitle = "Akun" }) => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  const getInputProps = (field) => {
    if (field.type === "select") return {};

    if (field.name === "phoneNumber" || field.name === "accountNumber") {
      return {
        type: "tel",
        inputMode: "numeric",
        autoComplete: "tel",
      };
    }

    if (field.name === "riotId") {
      return {
        type: "text",
        autoComplete: "off",
        autoCapitalize: "none",
        spellCheck: "false",
      };
    }

    return {
      type: "text",
      inputMode: field.name === "userId" || field.name === "zoneId" ? "numeric" : "text",
    };
  };

  const handleFieldChange = (fieldName, rawValue) => {
    let sanitized = rawValue.replace(/[<>"'`]/g, "");

    if (
      fieldName === "userId" ||
      fieldName === "zoneId" ||
      fieldName === "phoneNumber" ||
      fieldName === "accountNumber"
    ) {
      sanitized = sanitized.replace(/[^\d]/g, "");
    }

    handleInputChange(fieldName, sanitized);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800">
      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 rounded-xl max-w-md w-full p-6 border border-slate-800 relative text-slate-100">
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Tutup Panduan"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3 text-white">
              <Info className="w-4 h-4 text-blue-400" />
              <h3 className="font-bold text-base">
                Panduan Menemukan ID {categoryTitle}
              </h3>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed mb-5">
              {guide || "Silakan buka aplikasi game atau layanan digital Anda, masuk ke menu profil / pengaturan akun, dan periksa nomor identitas akun Anda."}
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {idFields.length === 1 && idFields[0].name === "phoneNumber"
                ? "Nomor HP Tujuan"
                : idFields.length === 1 && idFields[0].name === "accountNumber"
                ? "Nomor Akun E-Wallet"
                : "Data Akun Tujuan"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Masukkan identitas akun tujuan dengan teliti
            </p>
          </div>
        </div>

        {guide && (
          <button
            type="button"
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 px-2.5 py-1.5 rounded-lg transition border border-slate-700/60 cursor-pointer flex-shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Petunjuk ID</span>
          </button>
        )}
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {idFields.map((field) => {
          if (field.type === "select") {
            return (
              <div key={field.name} className="space-y-1.5">
                <label
                  htmlFor={field.name}
                  className="block text-xs font-medium text-slate-300"
                >
                  {field.label} {field.required && <span className="text-rose-400">*</span>}
                </label>
                <div className="relative">
                  <select
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-100 focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-400">
                      -- {field.placeholder || "Pilih Opsi"} --
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          }

          const hasValue = Boolean(formData[field.name] && String(formData[field.name]).trim());

          return (
            <div key={field.name} className="space-y-1.5">
              <label
                htmlFor={field.name}
                className="block text-xs font-medium text-slate-300"
              >
                {field.label} {field.required && <span className="text-rose-400">*</span>}
              </label>
              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  {...getInputProps(field)}
                  className={`w-full border ${
                    hasValue ? "border-slate-600 bg-slate-950/80 text-slate-100" : "border-slate-700/80 bg-slate-950/50 text-slate-100"
                  } rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-blue-500 transition tracking-wide font-mono`}
                />
                {hasValue && (
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-emerald-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span>Terhubung langsung ke server provider resmi.</span>
      </div>
    </div>
  );
};

export default UserId;
