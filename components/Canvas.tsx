"use client";

import { Tldraw, Editor, TLUiOverrides } from "tldraw";
import "tldraw/tldraw.css";
import { useCallback, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AIPanel } from "./AIPanel";
import { ExportDialog } from "./ExportDialog";
import { Toolbar } from "./Toolbar";
import { ParticleBackground } from "./ParticleBackground";
import { MastersPanel } from "./MastersPanel";

const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    return tools;
  },
};

function WelcomeSplash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-[2000] flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl font-light tracking-[-2px] text-shimmer"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ArtFlow
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-sm text-[#7a7470] mt-3 tracking-[0.15em] font-light uppercase"
      >
        Create with AI
      </motion.p>
    </motion.div>
  );
}

export function Canvas() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [masterStyle, setMasterStyle] = useState("");

  const handleMount = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <Tldraw
          onMount={handleMount}
          overrides={uiOverrides}
        />
      </div>

      <ParticleBackground />

      <AnimatePresence>
        {showWelcome && (
          <WelcomeSplash onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      <Toolbar
        editor={editor}
        onAIClick={() => setShowAI(true)}
        onExportClick={() => setShowExport(true)}
      />

      {/* Left side: Masters Panel */}
      <MastersPanel
        selectedMaster={masterStyle}
        onSelectMaster={setMasterStyle}
      />

      <AnimatePresence>
        {showAI && editor && (
          <AIPanel
            editor={editor}
            onClose={() => setShowAI(false)}
            masterStyle={masterStyle}
          />
        )}
      </AnimatePresence>

      <ExportDialog
        editor={editor}
        open={showExport}
        onOpenChange={setShowExport}
      />

      {/* Watermark */}
      <div className="absolute bottom-3 left-[88px] z-[999] watermark text-xs font-light tracking-[0.1em]" style={{ fontFamily: "var(--font-display)" }}>
        ArtFlow
      </div>
    </div>
  );
}
