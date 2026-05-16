"use client";

import { Editor } from "tldraw";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, Sparkles, Wand2 } from "lucide-react";

interface AIPanelProps {
  editor: Editor;
  onClose: () => void;
}

const STYLES = [
  { label: "自动", value: "", emoji: "✨" },
  { label: "水彩", value: "watercolor painting style, soft washes, fluid pigments, wet-on-wet technique", emoji: "💧" },
  { label: "油画", value: "oil painting style, rich impasto texture, visible brushstrokes, classical technique", emoji: "🎨" },
  { label: "国画", value: "traditional Chinese ink painting style, xieyi, rice paper texture, ink wash", emoji: "🖌️" },
  { label: "写实", value: "photorealistic, ultra detailed, 8k resolution, professional photography", emoji: "📷" },
  { label: "动漫", value: "anime illustration style, vibrant colors, clean lines, detailed shading", emoji: "✏️" },
  { label: "像素", value: "pixel art style, retro game aesthetic, 16-bit colors", emoji: "👾" },
  { label: "扁平", value: "flat design illustration, minimalist, clean vector style, geometric shapes", emoji: "📐" },
];

const SIZES = [
  { label: "方形", value: "1024x1024" },
  { label: "横版", value: "1440x720" },
  { label: "竖版", value: "720x1440" },
];

export function AIPanel({ editor, onClose }: AIPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enhancing, setEnhancing] = useState(false);
  const [clearBrush, setClearBrush] = useState(true);

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
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      }
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
          const { blob } = await editor.toImage(exportIds, {
            format: "png",
            background: true,
          });
          base64 = await blobToBase64(blob);
        }
      }

      const fullPrompt = style ? `${prompt}. ${style}` : prompt;

      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          image: base64,
          prompt: fullPrompt,
          size,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "AI 生成失败");
      }

      const data = await res.json();
      const imageUrl = data.imageUrl;

      const [w, h] = size.split("x").map(Number);
      const assetId = `asset:ai_${Date.now()}` as any;
      editor.createAssets([
        {
          id: assetId,
          type: "image",
          typeName: "asset",
          props: {
            name: "ai-generated.png",
            src: imageUrl,
            w,
            h,
            mimeType: "image/png",
            isAnimated: false,
          },
          meta: {},
        },
      ]);

      const bounds = editor.getSelectionPageBounds();
      const x = bounds ? bounds.x + bounds.w + 20 : editor.getViewportScreenCenter().x - w / 2;
      const y = bounds ? bounds.y : editor.getViewportScreenCenter().y - h / 2;

      editor.createShape({
        type: "image",
        x,
        y,
        props: {
          assetId,
          w: bounds ? bounds.w : w / 2,
          h: bounds ? bounds.h : h / 2,
        },
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
      className="absolute top-14 right-3 z-[1000] w-72 rounded-xl glass-panel ai-glow p-4 max-h-[calc(100vh-80px)] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -8, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Sparkles className="h-4 w-4 text-[#8b7e74] sparkle-icon" />
          <h3 className="text-sm font-semibold tracking-tight text-foreground">AI 创作</h3>
        </motion.div>
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={onClose}
          className="p-1 rounded-md hover:bg-[#3d3a36]/5 text-[#7a7470] hover:text-[#3d3a36] transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-[11px] text-[#7a7470] mb-3"
      >
        {hasSelection ? "基于选中内容重绘" : "直接生成新图片到画布"}
      </motion.p>

      {/* Style Selection */}
      <div className="mb-3">
        <label className="text-[11px] font-medium text-[#7a7470] mb-1.5 block tracking-wide uppercase">画风</label>
        <div className="grid grid-cols-4 gap-1">
          {STYLES.map((s, i) => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStyle(s.value)}
              className={`text-[10px] py-1.5 px-1 rounded-md border transition-colors ${
                style === s.value
                  ? "border-[#8b7e74]/40 bg-[#8b7e74]/10 text-[#6b5e54]"
                  : "border-transparent hover:border-[#3d3a36]/10 text-[#7a7470] hover:text-[#3d3a36] hover:bg-[#3d3a36]/3"
              }`}
            >
              <motion.span
                className="block text-sm mb-0.5"
                animate={style === s.value ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {s.emoji}
              </motion.span>
              {s.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-3">
        <label className="text-[11px] font-medium text-[#7a7470] mb-1.5 block tracking-wide uppercase">尺寸</label>
        <div className="flex gap-1">
          {SIZES.map((s) => (
            <motion.button
              key={s.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSize(s.value)}
              className={`flex-1 text-[11px] py-1.5 rounded-md border transition-colors ${
                size === s.value
                  ? "border-[#8b7e74]/40 bg-[#8b7e74]/10 text-[#6b5e54]"
                  : "border-transparent hover:border-[#3d3a36]/10 text-[#7a7470] hover:text-[#3d3a36] hover:bg-[#3d3a36]/3"
              }`}
            >
              {s.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="relative mb-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要的画面..."
          className="w-full h-[72px] px-3 py-2 rounded-lg bg-[#3d3a36]/3 border border-[#3d3a36]/8 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-[#8b7e74]/40 placeholder:text-[#7a7470]/60 transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.85 }}
          onClick={enhancePrompt}
          disabled={enhancing || !prompt.trim()}
          className="absolute right-2 bottom-2 p-1 rounded-md hover:bg-[#8b7e74]/10 text-[#7a7470] hover:text-[#6b5e54] transition-colors disabled:opacity-30"
          title="AI 优化描述"
        >
          {enhancing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Wand2 className="h-3.5 w-3.5" />
          )}
        </motion.button>
      </div>
      <p className="text-[10px] text-[#7a7470] mb-2 text-right">
        ✨ 优化描述
      </p>

      {/* Clear brush option */}
      <label className="flex items-center gap-2 mb-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={clearBrush}
          onChange={(e) => setClearBrush(e.target.checked)}
          className="rounded border-[#3d3a36]/10 bg-[#3d3a36]/3 accent-[#8b7e74] h-3.5 w-3.5"
        />
        <span className="text-[11px] text-[#7a7470] group-hover:text-[#3d3a36] transition-colors">发送前去除画笔痕迹</span>
      </label>

      {error && (
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-[#c27171] mb-2"
        >
          {error}
        </motion.p>
      )}

      <motion.button
        whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className={`w-full h-8 rounded-lg text-white text-xs font-medium tracking-tight transition-all disabled:opacity-40 flex items-center justify-center ${
          loading ? "gradient-flow" : "bg-[#8b7e74] hover:bg-[#6b5e54]"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
            AI 创作中...
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            {hasSelection ? "重绘选中区域" : "生成图片"}
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
