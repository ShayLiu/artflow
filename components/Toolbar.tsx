"use client";

import { Editor } from "tldraw";
import { motion } from "framer-motion";
import { Sparkles, Download, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  editor: Editor | null;
  onAIClick: () => void;
  onExportClick: () => void;
}

export function Toolbar({ editor, onAIClick, onExportClick }: ToolbarProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.undo()}
        className="rounded-xl hover:bg-accent"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor?.redo()}
        className="rounded-xl hover:bg-accent"
      >
        <Redo2 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border/50 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onAIClick}
        className="rounded-xl hover:bg-accent gap-2"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">AI 重绘</span>
      </Button>

      <div className="w-px h-6 bg-border/50 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onExportClick}
        className="rounded-xl hover:bg-accent gap-2"
      >
        <Download className="h-4 w-4" />
        <span className="text-sm font-medium">导出</span>
      </Button>
    </motion.div>
  );
}
