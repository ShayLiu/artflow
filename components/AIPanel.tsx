"use client";

import { Editor } from "tldraw";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      className="absolute top-20 right-4 z-[1000] w-80 rounded-2xl bg-white/80 backdrop-blur-xl border border-border/50 shadow-xl shadow-black/5 p-5 max-h-[calc(100vh-120px)] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI 创作</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-xl">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {hasSelection ? "基于选中内容重绘" : "直接生成新图片"}
      </p>

      {/* Style Selection */}
      <div className="mb-3">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">画风</label>
        <div className="grid grid-cols-4 gap-1.5">
          {STYLES.map((s) => (
            <button
              key={s.label}
              onClick={() => setStyle(s.value)}
              className={`text-xs py-1.5 px-1 rounded-lg border transition-all ${
                style === s.value
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border/50 hover:border-primary/30 text-muted-foreground"
              }`}
            >
              <span className="block text-base mb-0.5">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-3">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">尺寸</label>
        <div className="flex gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s.value}
              onClick={() => setSize(s.value)}
              className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                size === s.value
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border/50 hover:border-primary/30 text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="relative mb-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要的画面..."
          className="w-full h-20 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60"
        />
        <button
          onClick={enhancePrompt}
          disabled={enhancing || !prompt.trim()}
          className="absolute right-2 bottom-2 p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
          title="AI 优化描述"
        >
          {enhancing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Wand2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground/60 mb-2 text-right">
        点击 ✨ 按钮可 AI 优化描述
      </p>

      {/* Clear brush option */}
      <label className="flex items-center gap-2 mb-3 cursor-pointer">
        <input
          type="checkbox"
          checked={clearBrush}
          onChange={(e) => setClearBrush(e.target.checked)}
          className="rounded border-border accent-primary"
        />
        <span className="text-xs text-muted-foreground">发送前去除画笔痕迹</span>
      </label>

      {error && <p className="text-sm text-destructive mb-2">{error}</p>}

      <Button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full rounded-xl bg-primary hover:bg-primary/90"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            生成中...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            {hasSelection ? "重绘选中区域" : "生成图片"}
          </>
        )}
      </Button>
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
