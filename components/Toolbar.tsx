"use client";

import { Editor } from "tldraw";
import { motion } from "framer-motion";
import { Sparkles, Download, Undo2, Redo2, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  editor: Editor | null;
  onAIClick: () => void;
  onExportClick: () => void;
}

export function Toolbar({ editor, onAIClick, onExportClick }: ToolbarProps) {
  const clearDrawings = () => {
    if (!editor) return;
    const shapes = editor.getCurrentPageShapes();
    const drawShapes = shapes.filter((s) => s.type === "draw");
    if (drawShapes.length === 0) return;
    editor.deleteShapes(drawShapes.map((s) => s.id));
  };

  return (
    <motion.div
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1 px-2 py-1.5 rounded-xl glass-panel"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.undo()}
        className="rounded-lg h-8 w-8 p-0 text-[#8a8f98] hover:text-foreground hover:bg-white/5"
      >
        <Undo2 className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.redo()}
        className="rounded-lg h-8 w-8 p-0 text-[#8a8f98] hover:text-foreground hover:bg-white/5"
      >
        <Redo2 className="h-3.5 w-3.5" />
      </Button>

      <div className="w-px h-4 bg-white/8 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={clearDrawings}
        className="rounded-lg h-8 px-2.5 text-[#8a8f98] hover:text-foreground hover:bg-white/5 gap-1.5"
        title="清除所有画笔痕迹"
      >
        <Eraser className="h-3.5 w-3.5" />
        <span className="text-xs font-medium tracking-tight">清除画笔</span>
      </Button>

      <div className="w-px h-4 bg-white/8 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onAIClick}
        className="rounded-lg h-8 px-2.5 text-[#8a8f98] hover:text-[#828fff] hover:bg-[#5e6ad2]/10 gap-1.5"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#5e6ad2]" />
        <span className="text-xs font-medium tracking-tight">AI 创作</span>
      </Button>

      <div className="w-px h-4 bg-white/8 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onExportClick}
        className="rounded-lg h-8 px-2.5 text-[#8a8f98] hover:text-foreground hover:bg-white/5 gap-1.5"
      >
        <Download className="h-3.5 w-3.5" />
        <span className="text-xs font-medium tracking-tight">导出</span>
      </Button>
    </motion.div>
  );
}
