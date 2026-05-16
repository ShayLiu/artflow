"use client";

import { Editor } from "tldraw";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIPanelProps {
  editor: Editor;
  onClose: () => void;
}

export function AIPanel({ editor, onClose }: AIPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const selectedShapes = editor.getSelectedShapes();
    if (selectedShapes.length === 0) {
      setError("请先在画布上选择一个区域或图片");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { blob } = await editor.toImage(
        selectedShapes.map((s) => s.id),
        { format: "png", background: true }
      );

      const base64 = await blobToBase64(blob);

      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, prompt }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "AI 生成失败");
      }

      const data = await res.json();
      const imageUrl = data.imageUrl;

      const assetId = `asset:ai_${Date.now()}` as any;
      editor.createAssets([
        {
          id: assetId,
          type: "image",
          typeName: "asset",
          props: {
            name: "ai-generated.png",
            src: imageUrl,
            w: 512,
            h: 512,
            mimeType: "image/png",
            isAnimated: false,
          },
          meta: {},
        },
      ]);

      const bounds = editor.getSelectionPageBounds();
      if (bounds) {
        editor.createShape({
          type: "image",
          x: bounds.x,
          y: bounds.y,
          props: {
            assetId,
            w: bounds.w,
            h: bounds.h,
          },
        });
      }

      onClose();
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
      className="absolute top-20 right-4 z-[1000] w-80 rounded-2xl bg-white/80 backdrop-blur-xl border border-border/50 shadow-xl shadow-black/5 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI 局部重绘</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-xl">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-3">
        选中画布上的区域或图片，输入描述来重新生成
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="描述你想要的效果..."
        className="w-full h-24 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60"
      />

      {error && <p className="text-sm text-destructive mt-2">{error}</p>}

      <Button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full mt-3 rounded-xl bg-primary hover:bg-primary/90"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            生成中...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            生成
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
