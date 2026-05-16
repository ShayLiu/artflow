"use client";

import { Editor } from "tldraw";
import { motion } from "framer-motion";
import { Sparkles, Download, Undo2, Redo2, Eraser } from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
  onAIClick: () => void;
  onExportClick: () => void;
}

function ToolbarButton({
  onClick,
  children,
  className = "",
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      onClick={onClick}
      title={title}
      className={`rounded-lg h-8 flex items-center justify-center text-[#7a7470] transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
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
      initial={{ y: -20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="absolute top-3 left-1/2 z-[1000] flex items-center gap-1 px-2 py-1.5 rounded-xl glass-panel toolbar-float"
    >
      <ToolbarButton
        onClick={() => editor?.undo()}
        className="w-8 p-0 hover:text-[#3d3a36] hover:bg-[#3d3a36]/5"
      >
        <Undo2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.redo()}
        className="w-8 p-0 hover:text-[#3d3a36] hover:bg-[#3d3a36]/5"
      >
        <Redo2 className="h-3.5 w-3.5" />
      </ToolbarButton>

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.5 }}
        className="w-px h-4 bg-[#3d3a36]/10 mx-1"
      />

      <ToolbarButton
        onClick={clearDrawings}
        className="px-2.5 gap-1.5 hover:text-[#3d3a36] hover:bg-[#3d3a36]/5"
        title="清除所有画笔痕迹"
      >
        <Eraser className="h-3.5 w-3.5" />
        <span className="text-xs font-medium tracking-tight">清除画笔</span>
      </ToolbarButton>

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.6 }}
        className="w-px h-4 bg-[#3d3a36]/10 mx-1"
      />

      <ToolbarButton
        onClick={onAIClick}
        className="rounded-lg h-8 px-2.5 text-[#7a7470] hover:text-[#8b7e74] hover:bg-[#8b7e74]/10 gap-1.5"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#8b7e74] sparkle-icon" />
        <span className="text-xs font-medium tracking-tight">AI 创作</span>
      </ToolbarButton>

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.7 }}
        className="w-px h-4 bg-[#3d3a36]/10 mx-1"
      />

      <ToolbarButton
        onClick={onExportClick}
        className="px-2.5 gap-1.5 hover:text-[#3d3a36] hover:bg-[#3d3a36]/5"
      >
        <Download className="h-3.5 w-3.5" />
        <span className="text-xs font-medium tracking-tight">导出</span>
      </ToolbarButton>
    </motion.div>
  );
}
