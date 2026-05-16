"use client";

import { Tldraw, Editor, TLUiOverrides } from "tldraw";
import "tldraw/tldraw.css";
import { useCallback, useState } from "react";
import { AIPanel } from "./AIPanel";
import { ExportDialog } from "./ExportDialog";
import { Toolbar } from "./Toolbar";

const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    return tools;
  },
};

export function Canvas() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [showExport, setShowExport] = useState(false);

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

      <Toolbar
        editor={editor}
        onAIClick={() => setShowAI(true)}
        onExportClick={() => setShowExport(true)}
      />

      {showAI && editor && (
        <AIPanel editor={editor} onClose={() => setShowAI(false)} />
      )}

      <ExportDialog
        editor={editor}
        open={showExport}
        onOpenChange={setShowExport}
      />
    </div>
  );
}
