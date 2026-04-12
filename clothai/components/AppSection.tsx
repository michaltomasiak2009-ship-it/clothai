"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  ImageIcon,
  Wand2,
  User,
  Download,
  Loader2,
  X,
  CheckCircle,
  ChevronLeft,
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
} from "lucide-react";

type Mode = "remove-background" | "on-model";
type ProcessingState = "idle" | "uploading" | "processing" | "done" | "error";

interface ResultData {
  mode: Mode;
  resultUrl: string;
  processingTime: number;
}

export default function AppSection() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<ProcessingState>("idle");
  const [result, setResult] = useState<ResultData | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const sliderRef = useRef<number>(50);
  const [sliderPos, setSliderPos] = useState(50);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError(null);
    setState("idle");
    setActiveMode(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleProcess = async (mode: Mode) => {
    if (!file) return;
    setActiveMode(mode);
    setError(null);
    setState("uploading");

    try {
      // 1. Upload
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error);
      setFileId(uploadData.fileId);

      // 2. Process
      setState("processing");
      const processRes = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: uploadData.fileId, mode }),
      });
      const processData = await processRes.json();
      if (!processRes.ok) throw new Error(processData.error);

      // Mock: use original preview since we don't have real AI output
      setResult({
        mode,
        resultUrl: preview!, // In production: processData.resultUrl
        processingTime: processData.processingTime ?? 2.5,
      });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak");
      setState("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setFileId(null);
    setError(null);
    setState("idle");
    setActiveMode(null);
    setShowComparison(false);
  };

  const handleDownload = () => {
    if (!result?.resultUrl) return;
    const a = document.createElement("a");
    a.href = result.resultUrl;
    a.download = `clothai-${result.mode}-${Date.now()}.jpg`;
    a.click();
  };

  const isProcessing = state === "uploading" || state === "processing";

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Top bar */}
      <div className="border-b border-zinc-100 bg-white sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <ChevronLeft size={15} />
              Strona główna
            </button>
            <div className="w-px h-4 bg-zinc-200" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-zinc-900 rounded flex items-center justify-center">
                <Sparkles size={11} className="text-white" />
              </div>
              <span className="text-[13px] font-semibold text-zinc-900">Studio AI</span>
            </div>
          </div>
          {file && (
            <div className="flex items-center gap-2">
              <div className="h-5 px-2 bg-zinc-100 rounded text-[11px] font-medium text-zinc-500 flex items-center">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </div>
              <div className="h-5 px-2 bg-zinc-100 rounded text-[11px] font-medium text-zinc-500 flex items-center uppercase">
                {file.name.split(".").pop()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {!file ? (
          /* ── UPLOAD ZONE ── */
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
                Wgraj zdjęcie ubrania
              </h2>
              <p className="text-[15px] text-zinc-500">
                Obsługujemy JPEG, PNG i WebP do 10 MB
              </p>
            </div>

            <div
              {...getRootProps()}
              className={`relative cursor-pointer group rounded-2xl border-2 border-dashed transition-all duration-200 p-16 flex flex-col items-center justify-center gap-5 ${
                isDragActive
                  ? "border-blue-400 bg-blue-50 drag-active"
                  : "border-zinc-200 bg-zinc-50/50 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <input {...getInputProps()} />
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isDragActive
                    ? "bg-blue-100 scale-110"
                    : "bg-white border border-zinc-200 group-hover:scale-105 card-shadow"
                }`}
              >
                <Upload
                  size={24}
                  className={isDragActive ? "text-blue-500" : "text-zinc-400"}
                />
              </div>
              <div className="text-center">
                <p className="text-[15px] font-semibold text-zinc-800 mb-1">
                  {isDragActive
                    ? "Upuść tutaj!"
                    : "Przeciągnij zdjęcie lub kliknij"}
                </p>
                <p className="text-[13px] text-zinc-400">
                  JPG, PNG, WebP · Max 10 MB
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: "✓", text: "Jasne tło" },
                { icon: "✓", text: "Dobre oświetlenie" },
                { icon: "✓", text: "Całe ubranie w kadrze" },
              ].map((tip) => (
                <div
                  key={tip.text}
                  className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-100"
                >
                  <span className="text-emerald-500 font-bold text-sm">{tip.icon}</span>
                  <span className="text-[12px] text-zinc-600">{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── EDITOR ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Left: Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-zinc-800">
                  {state === "done" ? "Wynik" : "Oryginał"}
                </h3>
                {state === "done" && (
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-md px-2.5 py-1 transition-colors"
                  >
                    <SlidersHorizontal size={12} />
                    {showComparison ? "Ukryj" : "Porównaj"}
                  </button>
                )}
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 card-shadow aspect-[3/4] max-h-[600px]">
                {/* Original image */}
                {preview && (
                  <img
                    src={preview}
                    alt="Original"
                    className="w-full h-full object-contain"
                    style={
                      showComparison && state === "done"
                        ? { clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }
                        : {}
                    }
                  />
                )}

                {/* Processing overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center animate-pulse">
                        <Sparkles size={28} className="text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-zinc-200">
                        <Loader2 size={12} className="animate-spin text-zinc-600" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[15px] font-semibold text-zinc-800 mb-1">
                        {state === "uploading" ? "Przesyłanie..." : "AI pracuje..."}
                      </p>
                      <p className="text-[13px] text-zinc-400">
                        {state === "uploading"
                          ? "Wgrywanie zdjęcia"
                          : activeMode === "remove-background"
                          ? "Usuwanie tła"
                          : "Generowanie modelki"}
                      </p>
                    </div>
                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 rounded-full transition-all duration-1000"
                        style={{ width: state === "uploading" ? "30%" : "80%" }}
                      />
                    </div>
                  </div>
                )}

                {/* Done result overlay */}
                {state === "done" && result && !showComparison && (
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 text-white rounded-full text-[11px] font-semibold">
                      <CheckCircle size={11} />
                      Gotowe · {result.processingTime.toFixed(1)}s
                    </div>
                  </div>
                )}

                {/* Error */}
                {state === "error" && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                      <X size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[13px] font-medium text-red-800">Błąd przetwarzania</p>
                        <p className="text-[12px] text-red-600 mt-0.5">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reset button */}
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-white transition-colors card-shadow"
                >
                  <X size={14} className="text-zinc-500" />
                </button>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="space-y-4">
              {/* File info */}
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center card-shadow">
                    <ImageIcon size={18} className="text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-zinc-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-[12px] text-zinc-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type.split("/")[1].toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <p className="text-[12px] font-semibold text-zinc-500 uppercase tracking-wide">
                  Wybierz tryb AI
                </p>

                <ActionButton
                  icon={<Wand2 size={18} />}
                  label="Usuń tło"
                  description="Czyste, studyjne białe tło"
                  onClick={() => handleProcess("remove-background")}
                  disabled={isProcessing}
                  active={activeMode === "remove-background" && state === "done"}
                  loading={isProcessing && activeMode === "remove-background"}
                  color="blue"
                />

                <ActionButton
                  icon={<User size={18} />}
                  label="Na modelce"
                  description="Profesjonalna modelka / model"
                  onClick={() => handleProcess("on-model")}
                  disabled={isProcessing}
                  active={activeMode === "on-model" && state === "done"}
                  loading={isProcessing && activeMode === "on-model"}
                  color="violet"
                />
              </div>

              {/* Download */}
              {state === "done" && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 h-11 bg-zinc-900 text-white text-[14px] font-medium rounded-xl hover:bg-zinc-700 transition-colors mt-2"
                >
                  <Download size={16} />
                  Pobierz zdjęcie
                </button>
              )}

              {/* Try again */}
              {(state === "done" || state === "error") && (
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 h-10 text-[13px] text-zinc-500 hover:text-zinc-800 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  <RefreshCw size={13} />
                  Wgraj nowe zdjęcie
                </button>
              )}

              {/* Info cards */}
              <div className="pt-2 space-y-2">
                {[
                  { label: "Czas przetwarzania", value: "~3–5s" },
                  { label: "Formaty wyjściowe", value: "PNG, JPEG" },
                  { label: "Rozdzielczość", value: "Do 4K" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-zinc-50"
                  >
                    <span className="text-[12px] text-zinc-400">{item.label}</span>
                    <span className="text-[12px] font-medium text-zinc-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  color: "blue" | "violet";
}

function ActionButton({
  icon,
  label,
  description,
  onClick,
  disabled,
  active,
  loading,
  color,
}: ActionButtonProps) {
  const colorMap = {
    blue: {
      active: "border-blue-300 bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      badge: "bg-blue-500",
    },
    violet: {
      active: "border-violet-300 bg-violet-50",
      icon: "bg-violet-100 text-violet-600",
      badge: "bg-violet-500",
    },
  };
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        active
          ? c.active
          : disabled && !loading
          ? "border-zinc-100 bg-zinc-50 opacity-50 cursor-not-allowed"
          : "border-zinc-150 bg-white hover:border-zinc-200 hover:bg-zinc-50 card-shadow"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? c.icon : "bg-zinc-100 text-zinc-500"}`}>
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          icon
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-zinc-800">{label}</p>
          {active && (
            <div className={`w-1.5 h-1.5 rounded-full ${c.badge}`} />
          )}
        </div>
        <p className="text-[12px] text-zinc-400 mt-0.5">{description}</p>
      </div>
      {!loading && !active && (
        <div className="text-zinc-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}
