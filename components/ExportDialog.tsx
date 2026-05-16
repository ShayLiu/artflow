"use client";

import { Editor, exportAs } from "tldraw";
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExportDialogProps {
  editor: Editor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RATIOS = [
  { label: "自由", value: "free" },
  { label: "1:1", value: "1:1" },
  { label: "4:3", value: "4:3" },
  { label: "3:4", value: "3:4" },
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
];

const FORMATS = [
  { label: "PNG", value: "png" },
  { label: "SVG", value: "svg" },
  { label: "JSON", value: "json" },
];

export function ExportDialog({ editor, open, onOpenChange }: ExportDialogProps) {
  const [ratio, setRatio] = useState("free");
  const [format, setFormat] = useState<"png" | "svg" | "json">("png");
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!editor) return;
    setExporting(true);

    try {
      const selectedIds = editor.getSelectedShapeIds();
      const ids = selectedIds.length > 0
        ? [...selectedIds]
        : [...editor.getCurrentPageShapeIds()];

      if (ids.length === 0) {
        alert("画布上没有内容可导出");
        return;
      }

      if (format === "json") {
        const data = editor.getContentFromCurrentPage(ids);
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        downloadBlob(blob, `artflow-export.json`);
        onOpenChange(false);
        return;
      }

      exportAs(editor, ids, { format, background: true, padding: 16 });
      onOpenChange(false);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-xl border-border/50 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            导出画布
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">画面比例</label>
            <Select value={ratio} onValueChange={(v) => v && setRatio(v)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RATIOS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">导出格式</label>
            <Select value={format} onValueChange={(v) => v && setFormat(v as any)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-xs text-muted-foreground">
            选中元素只导出选中部分，未选中则导出全部画布内容
          </p>

          <Button
            onClick={handleExport}
            disabled={exporting}
            className="w-full rounded-xl bg-primary hover:bg-primary/90"
          >
            <Download className="h-4 w-4 mr-2" />
            {exporting ? "导出中..." : "导出"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
