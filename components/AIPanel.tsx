"use client";

import { Editor } from "tldraw";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles, Wand2 } from "lucide-react";

interface AIPanelProps {
  editor: Editor;
  onClose: () => void;
}

const STYLES = [
  { label: "自动", value: "", emoji: "✨" },
  { label: "水彩", value: "watercolor painting, soft washes, fluid pigments, wet-on-wet", emoji: "💧" },
  { label: "油画", value: "oil painting, impasto texture, visible brushstrokes, classical", emoji: "🎨" },
  { label: "国画", value: "Chinese ink painting, xieyi, rice paper, ink wash", emoji: "🖌️" },
  { label: "写实", value: "photorealistic, ultra detailed, 8k, professional photography", emoji: "📷" },
  { label: "动漫", value: "anime illustration, vibrant colors, clean lines, cel shading", emoji: "✏️" },
  { label: "像素", value: "pixel art, retro game aesthetic, 16-bit, crisp edges", emoji: "👾" },
  { label: "扁平", value: "flat design, minimalist vector, geometric shapes, clean", emoji: "📐" },
  { label: "素描", value: "pencil sketch, graphite drawing, hatching technique, grayscale", emoji: "✒️" },
  { label: "版画", value: "woodcut print, linocut style, bold lines, high contrast", emoji: "🪵" },
  { label: "波普", value: "pop art, bold colors, Ben-Day dots, Roy Lichtenstein style", emoji: "💥" },
  { label: "赛博", value: "cyberpunk, neon glow, dark city, futuristic, holographic", emoji: "🌃" },
  { label: "蒸汽波", value: "vaporwave aesthetic, pastel gradients, retro 80s, glitch", emoji: "🌸" },
  { label: "浮世绘", value: "ukiyo-e Japanese woodblock print, Hokusai waves style", emoji: "🌊" },
  { label: "极简", value: "minimalist art, negative space, single color accent, zen", emoji: "⬜" },
  { label: "梦幻", value: "dreamlike surreal, soft focus, ethereal glow, fantasy", emoji: "🌙" },
];

const RATIOS = [
  { label: "1:1", w: 1024, h: 1024 },
  { label: "3:4", w: 768, h: 1024 },
  { label: "4:3", w: 1024, h: 768 },
  { label: "9:16", w: 576, h: 1024 },
  { label: "16:9", w: 1024, h: 576 },
  { label: "2:3", w: 682, h: 1024 },
  { label: "3:2", w: 1024, h: 682 },
];

const MASTERS = [
  {
    name: "莫兰迪",
    en: "Giorgio Morandi",
    prompt: "in the style of Giorgio Morandi, muted earthy tones, soft light, still life composition, quiet elegance, desaturated palette",
    color: "#c4bbb3",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Giorgio_Morandi_-_Natura_Morta_1956.jpg/300px-Giorgio_Morandi_-_Natura_Morta_1956.jpg",
  },
  {
    name: "毕加索",
    en: "Pablo Picasso",
    prompt: "in the style of Pablo Picasso, cubism, geometric fragmentation, multiple viewpoints, bold outlines, abstract figurative",
    color: "#a08b8b",
    preview: "https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg",
  },
  {
    name: "莫奈",
    en: "Claude Monet",
    prompt: "in the style of Claude Monet, impressionism, soft brushstrokes, natural light, plein air, water reflections, atmospheric",
    color: "#8fa08b",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/300px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
  },
  {
    name: "梵高",
    en: "Vincent van Gogh",
    prompt: "in the style of Vincent van Gogh, post-impressionism, swirling brushstrokes, vivid colors, expressive texture, starry night",
    color: "#8b8ea0",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/300px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    name: "草间弥生",
    en: "Yayoi Kusama",
    prompt: "in the style of Yayoi Kusama, infinity dots, polka dot patterns, bold repetition, vivid red and white, psychedelic",
    color: "#c27171",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg/300px-Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg",
  },
  {
    name: "浮世绘",
    en: "Katsushika Hokusai",
    prompt: "in the style of Hokusai, Japanese ukiyo-e woodblock print, The Great Wave, traditional Japanese art, detailed linework",
    color: "#7a8a9a",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/300px-Tsunami_by_hokusai_19th_century.jpg",
  },
  {
    name: "达利",
    en: "Salvador Dalí",
    prompt: "in the style of Salvador Dalí, surrealism, melting clocks, dreamscape, hyper-detailed, bizarre juxtaposition",
    color: "#b0a090",
    preview: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
  },
  {
    name: "克里姆特",
    en: "Gustav Klimt",
    prompt: "in the style of Gustav Klimt, Art Nouveau, gold leaf, ornamental patterns, sensual figures, decorative mosaic",
    color: "#c8b060",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/300px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
  },
];

export function AIPanel({ editor, onClose }: AIPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [masterStyle, setMasterStyle] = useState("");
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enhancing, setEnhancing] = useState(false);
  const [clearBrush, setClearBrush] = useState(true);
  const styleScrollRef = useRef<HTMLDivElement>(null);
  const masterScrollRef = useRef<HTMLDivElement>(null);

  const hasSelection = editor.getSelectedShapes().length > 0;

  const enhancePrompt = async () => {
    if (!prompt.trim()) return;
    setEnhancing(true);
    try {
      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enhance", prompt }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) setPrompt(data.enhancedPrompt);
    } catch {}
    setEnhancing(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      let base64 = undefined;
      if (hasSelection) {
        const selectedShapes = editor.getSelectedShapes();
        const exportIds = clearBrush
          ? selectedShapes.filter((s) => s.type !== "draw").map((s) => s.id)
          : selectedShapes.map((s) => s.id);
        if (exportIds.length > 0) {
          const { blob } = await editor.toImage(exportIds, { format: "png", background: true });
          base64 = await blobToBase64(blob);
        }
      }

      let fullPrompt = prompt;
      if (masterStyle) fullPrompt += `. ${masterStyle}`;
      if (style) fullPrompt += `. ${style}`;

      const size = `${ratio.w}x${ratio.h}`;
      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", image: base64, prompt: fullPrompt, size }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "AI 生成失败");
      }

      const data = await res.json();
      const assetId = `asset:ai_${Date.now()}` as any;
      editor.createAssets([{
        id: assetId, type: "image", typeName: "asset",
        props: { name: "ai-generated.png", src: data.imageUrl, w: ratio.w, h: ratio.h, mimeType: "image/png", isAnimated: false },
        meta: {},
      }]);

      const bounds = editor.getSelectionPageBounds();
      const x = bounds ? bounds.x + bounds.w + 20 : editor.getViewportScreenCenter().x - ratio.w / 4;
      const y = bounds ? bounds.y : editor.getViewportScreenCenter().y - ratio.h / 4;
      editor.createShape({
        type: "image", x, y,
        props: { assetId, w: bounds ? bounds.w : ratio.w / 2, h: bounds ? bounds.h : ratio.h / 2 },
      });
    } catch (err: any) {
      setError(err.message || "生成失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 24, opacity: 0, scale: 0.96 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 24, opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute top-14 right-3 z-[1000] w-80 rounded-2xl glass-panel ai-glow p-4 max-h-[calc(100vh-80px)] overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.div className="flex items-center gap-2" initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Sparkles className="h-4 w-4 text-[#8b7e74] sparkle-icon" />
          <h3 className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>AI 创作</h3>
        </motion.div>
        <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.8 }} onClick={onClose}
          className="p-1 rounded-md hover:bg-[#3d3a36]/5 text-[#7a7470] hover:text-[#3d3a36]">
          <X className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      <p className="text-[11px] text-[#7a7470] mb-3">
        {hasSelection ? "基于选中内容重绘" : "直接生成新图片到画布"}
      </p>

      {/* Master Styles - horizontal scroll */}
      <div className="mb-3">
        <label className="text-[11px] font-medium text-[#7a7470] mb-2 block tracking-wide uppercase"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>大师风格</label>
        <div ref={masterScrollRef} className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
          {MASTERS.map((m, i) => (
            <motion.button
              key={m.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, type: "spring", stiffness: 250, damping: 20 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMasterStyle(masterStyle === m.prompt ? "" : m.prompt)}
              className={`flex-shrink-0 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                masterStyle === m.prompt
                  ? "border-[#8b7e74] shadow-md shadow-[#8b7e74]/20"
                  : "border-transparent hover:border-[#8b7e74]/20"
              }`}
            >
              <div className="w-20 h-16 bg-cover bg-center" style={{
                backgroundColor: m.color,
                backgroundImage: `url(${m.preview})`,
                backgroundSize: "cover",
              }}>
                <motion.div
                  className="w-full h-full"
                  animate={masterStyle === m.prompt ? { opacity: [0.3, 0, 0.3] } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: `radial-gradient(circle, ${m.color}88 0%, transparent 70%)` }}
                />
              </div>
              <div className="px-1 py-1.5 text-center" style={{ backgroundColor: `${m.color}20` }}>
                <p className="text-[10px] font-medium text-[#3d3a36]" style={{ fontFamily: "var(--font-display)" }}>{m.name}</p>
                <p className="text-[8px] text-[#7a7470] truncate">{m.en}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Styles - horizontal scroll */}
      <div className="mb-3">
        <label className="text-[11px] font-medium text-[#7a7470] mb-2 block tracking-wide uppercase"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>画风</label>
        <div ref={styleScrollRef} className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
          {STYLES.map((s, i) => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStyle(style === s.value ? "" : s.value)}
              className={`flex-shrink-0 text-[10px] py-2 px-3 rounded-full border transition-all ${
                style === s.value
                  ? "border-[#8b7e74]/40 bg-[#8b7e74]/10 text-[#6b5e54]"
                  : "border-[#3d3a36]/8 text-[#7a7470] hover:text-[#3d3a36] hover:bg-[#3d3a36]/3"
              }`}
            >
              <span className="mr-1">{s.emoji}</span>{s.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Ratio - horizontal scroll */}
      <div className="mb-3">
        <label className="text-[11px] font-medium text-[#7a7470] mb-2 block tracking-wide uppercase"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>比例</label>
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
          {RATIOS.map((r) => {
            const isSelected = ratio.label === r.label;
            const aspect = r.w / r.h;
            const boxW = aspect >= 1 ? 18 : 18 * aspect;
            const boxH = aspect >= 1 ? 18 / aspect : 18;
            return (
              <motion.button
                key={r.label}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setRatio(r)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg border transition-all ${
                  isSelected
                    ? "border-[#8b7e74]/40 bg-[#8b7e74]/10 text-[#6b5e54]"
                    : "border-transparent text-[#7a7470] hover:text-[#3d3a36] hover:bg-[#3d3a36]/3"
                }`}
              >
                <motion.div
                  className="rounded-[2px]"
                  animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: boxW, height: boxH,
                    border: isSelected ? "1.5px solid #8b7e74" : "1px solid #7a747060",
                    background: isSelected ? "#8b7e7415" : "transparent",
                  }}
                />
                <span className="text-[10px]">{r.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Prompt */}
      <div className="relative mb-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要的画面..."
          className="w-full h-[72px] px-3 py-2 rounded-xl bg-[#3d3a36]/3 border border-[#3d3a36]/8 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-[#8b7e74]/40 placeholder:text-[#7a7470]/50 transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.85 }}
          onClick={enhancePrompt}
          disabled={enhancing || !prompt.trim()}
          className="absolute right-2 bottom-2 p-1 rounded-md hover:bg-[#8b7e74]/10 text-[#7a7470] hover:text-[#6b5e54] disabled:opacity-30"
        >
          {enhancing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
        </motion.button>
      </div>
      <p className="text-[9px] text-[#7a7470]/60 mb-2 text-right">✨ AI 优化描述</p>

      {/* Options */}
      <label className="flex items-center gap-2 mb-3 cursor-pointer group">
        <input type="checkbox" checked={clearBrush} onChange={(e) => setClearBrush(e.target.checked)}
          className="rounded border-[#3d3a36]/10 bg-[#3d3a36]/3 accent-[#8b7e74] h-3.5 w-3.5" />
        <span className="text-[11px] text-[#7a7470] group-hover:text-[#3d3a36] transition-colors">发送前去除画笔痕迹</span>
      </label>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="text-xs text-[#c27171] mb-2">{error}</motion.p>
        )}
      </AnimatePresence>

      {/* Generate */}
      <motion.button
        whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className={`w-full h-9 rounded-xl text-white text-xs font-medium tracking-tight transition-all disabled:opacity-40 flex items-center justify-center ${
          loading ? "gradient-flow" : "bg-[#8b7e74] hover:bg-[#6b5e54]"
        }`}
      >
        {loading ? (
          <><Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />AI 创作中...</>
        ) : (
          <><Sparkles className="h-3.5 w-3.5 mr-1.5" />{hasSelection ? "重绘选中区域" : "生成图片"}</>
        )}
      </motion.button>
    </motion.div>
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
