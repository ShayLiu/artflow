"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MasterDef {
  name: string;
  en: string;
  prompt: string;
  colors: [string, string];
  initial: string;
}

const MASTERS: MasterDef[] = [
  {
    name: "莫兰迪", en: "Morandi",
    prompt: "in the style of Giorgio Morandi, muted earthy tones, soft light, still life composition, quiet elegance, desaturated palette",
    colors: ["#c4bbb3", "#a89b91"], initial: "M",
  },
  {
    name: "毕加索", en: "Picasso",
    prompt: "in the style of Pablo Picasso, cubism, geometric fragmentation, multiple viewpoints, bold outlines, abstract figurative",
    colors: ["#a08b8b", "#8b6b6b"], initial: "P",
  },
  {
    name: "莫奈", en: "Monet",
    prompt: "in the style of Claude Monet, impressionism, soft brushstrokes, natural light, plein air, water reflections, atmospheric",
    colors: ["#8fa08b", "#6b8b7a"], initial: "M",
  },
  {
    name: "梵高", en: "Van Gogh",
    prompt: "in the style of Vincent van Gogh, post-impressionism, swirling brushstrokes, vivid colors, expressive texture, starry night",
    colors: ["#8b8ea0", "#4060a0"], initial: "V",
  },
  {
    name: "草间弥生", en: "Kusama",
    prompt: "in the style of Yayoi Kusama, infinity dots, polka dot patterns, bold repetition, vivid red and white, psychedelic",
    colors: ["#c27171", "#e05050"], initial: "K",
  },
  {
    name: "北斋", en: "Hokusai",
    prompt: "in the style of Hokusai, Japanese ukiyo-e woodblock print, The Great Wave, traditional Japanese art, detailed linework",
    colors: ["#7a8a9a", "#4060a0"], initial: "H",
  },
  {
    name: "达利", en: "Dalí",
    prompt: "in the style of Salvador Dalí, surrealism, melting clocks, dreamscape, hyper-detailed, bizarre juxtaposition",
    colors: ["#b0a090", "#907050"], initial: "D",
  },
  {
    name: "克里姆特", en: "Klimt",
    prompt: "in the style of Gustav Klimt, Art Nouveau, gold leaf, ornamental patterns, sensual figures, decorative mosaic",
    colors: ["#c8b060", "#a09040"], initial: "K",
  },
  {
    name: "蒙德里安", en: "Mondrian",
    prompt: "in the style of Piet Mondrian, De Stijl, primary colors, black grid lines, geometric abstraction, neoplasticism",
    colors: ["#d4c44c", "#c04040"], initial: "M",
  },
  {
    name: "马蒂斯", en: "Matisse",
    prompt: "in the style of Henri Matisse, fauvism, bold flat colors, expressive cutouts, joyful composition, decorative patterns",
    colors: ["#8aba8a", "#40a060"], initial: "M",
  },
  {
    name: "伦勃朗", en: "Rembrandt",
    prompt: "in the style of Rembrandt, chiaroscuro, dramatic lighting, Dutch Golden Age, rich dark tones, portrait mastery",
    colors: ["#8a7a60", "#504030"], initial: "R",
  },
  {
    name: "维米尔", en: "Vermeer",
    prompt: "in the style of Johannes Vermeer, soft natural light, domestic interiors, luminous colors, photographic precision, pearl-like glow",
    colors: ["#a0b0c0", "#6080a0"], initial: "V",
  },
  {
    name: "雷诺阿", en: "Renoir",
    prompt: "in the style of Pierre-Auguste Renoir, impressionism, warm rosy light, joyful scenes, soft feminine figures, dappled sunlight",
    colors: ["#d0a0a0", "#c08080"], initial: "R",
  },
  {
    name: "康定斯基", en: "Kandinsky",
    prompt: "in the style of Wassily Kandinsky, abstract art, geometric shapes, vibrant primary colors, musical composition, spiritual abstraction",
    colors: ["#4080c0", "#c04040"], initial: "K",
  },
];

interface MastersPanelProps {
  selectedMaster: string;
  onSelectMaster: (prompt: string) => void;
}

export function MastersPanel({ selectedMaster, onSelectMaster }: MastersPanelProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute z-[1001] top-1/2 -translate-y-1/2 w-4 h-10 flex items-center justify-center rounded-r-md text-[#7a7470] hover:text-[#3d3a36]"
        style={{
          left: collapsed ? 0 : 52,
          background: "rgba(250,248,246,0.4)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.25)",
          borderRight: "1px solid rgba(255,255,255,0.25)",
          borderBottom: "1px solid rgba(255,255,255,0.25)",
          transition: "left 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {collapsed ? <ChevronRight className="w-2.5 h-2.5" /> : <ChevronLeft className="w-2.5 h-2.5" />}
      </motion.button>

      {/* Panel */}
      <motion.div
        animate={{ x: collapsed ? -48 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-[999] w-[50px] overflow-hidden rounded-2xl"
        style={{
          maxHeight: "min(480px, calc(100vh - 100px))",
          background: "rgba(250, 248, 246, 0.28)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.22)",
        }}
      >
        <div
          className="overflow-y-auto py-2 px-0.5"
          style={{ scrollbarWidth: "none", maxHeight: "min(480px, calc(100vh - 100px))" }}
        >
          <div className="flex flex-col gap-2 items-center">
            {MASTERS.map((m, i) => {
              const isSelected = selectedMaster === m.prompt;

              return (
                <motion.button
                  key={m.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: [0, -1.5, 0] }}
                  transition={{
                    opacity: { delay: 0.05 * i, duration: 0.3 },
                    y: { delay: 1.5 + 0.2 * i, duration: 3 + i * 0.12, repeat: Infinity, ease: "easeInOut" },
                  }}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.82 }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  onClick={() => onSelectMaster(isSelected ? "" : m.prompt)}
                  className="relative flex flex-col items-center"
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl"
                    animate={isSelected ? {
                      boxShadow: [
                        `0 0 4px ${m.colors[0]}30`,
                        `0 0 10px ${m.colors[0]}50`,
                        `0 0 4px ${m.colors[0]}30`,
                      ],
                    } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Color block avatar */}
                  <div
                    className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${m.colors[0]}, ${m.colors[1]})`,
                      boxShadow: isSelected ? `0 0 0 2px ${m.colors[0]}, 0 2px 8px ${m.colors[0]}40` : "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                  >
                    <motion.span
                      className="text-white/90 font-bold text-xs"
                      style={{ fontFamily: "var(--font-display)", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                      animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {m.initial}
                    </motion.span>
                  </div>

                  {/* Name */}
                  <motion.p
                    className="text-[7px] mt-0.5 leading-tight text-center max-w-[46px] truncate"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: isSelected ? "#3d3a36" : "#7a7470",
                      fontWeight: isSelected ? 600 : 400,
                    }}
                    animate={{ opacity: isSelected || hovered === i ? 1 : 0.5 }}
                  >
                    {m.name}
                  </motion.p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
