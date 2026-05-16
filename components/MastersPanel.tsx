"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MasterDef {
  name: string;
  en: string;
  prompt: string;
  colors: [string, string];
  initial: string;
  works: { title: string; color: string }[];
}

const MASTERS: MasterDef[] = [
  {
    name: "莫兰迪", en: "Morandi",
    prompt: "in the style of Giorgio Morandi, muted earthy tones, soft light, still life composition, quiet elegance, desaturated palette",
    colors: ["#c4bbb3", "#a89b91"], initial: "M",
    works: [
      { title: "静物", color: "#c4bbb3" }, { title: "瓶子", color: "#b8ada3" },
      { title: "花卉", color: "#d2c8be" }, { title: "风景", color: "#a89990" },
      { title: "器物", color: "#bfb5aa" }, { title: "构成", color: "#d0c4b8" },
    ],
  },
  {
    name: "毕加索", en: "Picasso",
    prompt: "in the style of Pablo Picasso, cubism, geometric fragmentation, multiple viewpoints, bold outlines, abstract figurative",
    colors: ["#a08b8b", "#8b6b6b"], initial: "P",
    works: [
      { title: "亚维农", color: "#c4a0a0" }, { title: "格尔尼卡", color: "#6b6b6b" },
      { title: "梦", color: "#d4a0b0" }, { title: "哭泣", color: "#a0b0c0" },
      { title: "立体", color: "#b0a090" }, { title: "蓝色", color: "#7090b0" },
    ],
  },
  {
    name: "莫奈", en: "Monet",
    prompt: "in the style of Claude Monet, impressionism, soft brushstrokes, natural light, plein air, water reflections, atmospheric",
    colors: ["#8fa08b", "#6b8b7a"], initial: "M",
    works: [
      { title: "睡莲", color: "#7a9b8a" }, { title: "日出", color: "#d0a070" },
      { title: "撑伞", color: "#90b0a0" }, { title: "花园", color: "#80a880" },
      { title: "干草堆", color: "#c0a060" }, { title: "教堂", color: "#a0a0c0" },
    ],
  },
  {
    name: "梵高", en: "Van Gogh",
    prompt: "in the style of Vincent van Gogh, post-impressionism, swirling brushstrokes, vivid colors, expressive texture, starry night",
    colors: ["#8b8ea0", "#4060a0"], initial: "V",
    works: [
      { title: "星夜", color: "#3050a0" }, { title: "向日葵", color: "#d0b040" },
      { title: "鸢尾花", color: "#6070b0" }, { title: "麦田", color: "#c0b040" },
      { title: "自画像", color: "#508070" }, { title: "咖啡馆", color: "#d0c060" },
    ],
  },
  {
    name: "草间弥生", en: "Kusama",
    prompt: "in the style of Yayoi Kusama, infinity dots, polka dot patterns, bold repetition, vivid red and white, psychedelic",
    colors: ["#c27171", "#e05050"], initial: "K",
    works: [
      { title: "南瓜", color: "#e0c030" }, { title: "圆点", color: "#e05050" },
      { title: "无限", color: "#d06080" }, { title: "网", color: "#f0f0f0" },
      { title: "花", color: "#e07070" }, { title: "镜屋", color: "#c040c0" },
    ],
  },
  {
    name: "北斋", en: "Hokusai",
    prompt: "in the style of Hokusai, Japanese ukiyo-e woodblock print, The Great Wave, traditional Japanese art, detailed linework",
    colors: ["#7a8a9a", "#4060a0"], initial: "H",
    works: [
      { title: "神奈川", color: "#4070b0" }, { title: "赤富士", color: "#c06040" },
      { title: "雷神", color: "#506080" }, { title: "瀑布", color: "#5090c0" },
      { title: "桥", color: "#70a090" }, { title: "鸟", color: "#a0c0d0" },
    ],
  },
  {
    name: "达利", en: "Dalí",
    prompt: "in the style of Salvador Dalí, surrealism, melting clocks, dreamscape, hyper-detailed, bizarre juxtaposition",
    colors: ["#b0a090", "#907050"], initial: "D",
    works: [
      { title: "记忆", color: "#d0c0a0" }, { title: "天鹅", color: "#90a0c0" },
      { title: "梦境", color: "#c0b090" }, { title: "十字架", color: "#a09080" },
      { title: "大象", color: "#d0b080" }, { title: "玫瑰", color: "#c08080" },
    ],
  },
  {
    name: "克里姆特", en: "Klimt",
    prompt: "in the style of Gustav Klimt, Art Nouveau, gold leaf, ornamental patterns, sensual figures, decorative mosaic",
    colors: ["#c8b060", "#a09040"], initial: "K",
    works: [
      { title: "吻", color: "#c8b060" }, { title: "阿黛尔", color: "#b0a050" },
      { title: "生命树", color: "#90a060" }, { title: "水蛇", color: "#80a0b0" },
      { title: "花园", color: "#70b070" }, { title: "处女", color: "#c0a070" },
    ],
  },
  {
    name: "蒙德里安", en: "Mondrian",
    prompt: "in the style of Piet Mondrian, De Stijl, primary colors, black grid lines, geometric abstraction, neoplasticism",
    colors: ["#d4c44c", "#c04040"], initial: "M",
    works: [
      { title: "红蓝黄", color: "#c04040" }, { title: "百老汇", color: "#d0c040" },
      { title: "构成A", color: "#4040c0" }, { title: "灰色", color: "#a0a0a0" },
      { title: "菱形", color: "#f0e0a0" }, { title: "树", color: "#808080" },
    ],
  },
  {
    name: "马蒂斯", en: "Matisse",
    prompt: "in the style of Henri Matisse, fauvism, bold flat colors, expressive cutouts, joyful composition, decorative patterns",
    colors: ["#8aba8a", "#40a060"], initial: "M",
    works: [
      { title: "舞蹈", color: "#e06040" }, { title: "帽子", color: "#40a060" },
      { title: "蜗牛", color: "#e0c040" }, { title: "红色", color: "#c04040" },
      { title: "剪纸", color: "#4080d0" }, { title: "金鱼", color: "#e08040" },
    ],
  },
  {
    name: "伦勃朗", en: "Rembrandt",
    prompt: "in the style of Rembrandt, chiaroscuro, dramatic lighting, Dutch Golden Age, rich dark tones, portrait mastery",
    colors: ["#8a7a60", "#504030"], initial: "R",
    works: [
      { title: "夜巡", color: "#605040" }, { title: "自画像", color: "#706050" },
      { title: "解剖", color: "#504030" }, { title: "浪子", color: "#806040" },
      { title: "犹太", color: "#705838" }, { title: "风暴", color: "#405060" },
    ],
  },
  {
    name: "维米尔", en: "Vermeer",
    prompt: "in the style of Johannes Vermeer, soft natural light, domestic interiors, luminous colors, photographic precision, pearl-like glow",
    colors: ["#a0b0c0", "#6080a0"], initial: "V",
    works: [
      { title: "珍珠", color: "#a0b8d0" }, { title: "倒牛奶", color: "#d0c0a0" },
      { title: "情书", color: "#90a0b0" }, { title: "窗前", color: "#b0c0c8" },
      { title: "天文", color: "#806040" }, { title: "花边", color: "#c8c0b0" },
    ],
  },
  {
    name: "雷诺阿", en: "Renoir",
    prompt: "in the style of Pierre-Auguste Renoir, impressionism, warm rosy light, joyful scenes, soft feminine figures, dappled sunlight",
    colors: ["#d0a0a0", "#c08080"], initial: "R",
    works: [
      { title: "舞会", color: "#d0b0a0" }, { title: "摇摆", color: "#c0a090" },
      { title: "浴女", color: "#e0c0b0" }, { title: "午餐", color: "#b0c0a0" },
      { title: "花束", color: "#d0a0b0" }, { title: "少女", color: "#e0b0a0" },
    ],
  },
  {
    name: "康定斯基", en: "Kandinsky",
    prompt: "in the style of Wassily Kandinsky, abstract art, geometric shapes, vibrant primary colors, musical composition, spiritual abstraction",
    colors: ["#4080c0", "#c04040"], initial: "K",
    works: [
      { title: "构成", color: "#4080c0" }, { title: "圆形", color: "#d0c040" },
      { title: "即兴", color: "#c04040" }, { title: "黄红蓝", color: "#d0c040" },
      { title: "点线面", color: "#404040" }, { title: "上升", color: "#6060c0" },
    ],
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

      {/* Hover gallery */}
      <AnimatePresence>
        {hovered !== null && !collapsed && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, x: -6, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-[62px] top-1/2 -translate-y-1/2 z-[998]"
          >
            <div
              className="rounded-xl p-2.5 w-[180px]"
              style={{
                background: "rgba(250, 248, 246, 0.5)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: `0 6px 24px ${MASTERS[hovered].colors[0]}12, 0 2px 6px rgba(0,0,0,0.04)`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${MASTERS[hovered].colors[0]}, ${MASTERS[hovered].colors[1]})` }}
                >
                  <span className="text-white/90 text-[8px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {MASTERS[hovered].initial}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-[#3d3a36]" style={{ fontFamily: "var(--font-display)" }}>
                    {MASTERS[hovered].name}
                  </p>
                  <p className="text-[8px] text-[#7a7470]">{MASTERS[hovered].en}</p>
                </div>
              </div>

              {/* 6 works as color cards */}
              <div className="grid grid-cols-3 gap-1">
                {MASTERS[hovered].works.map((w, wi) => (
                  <motion.div
                    key={wi}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -1, 0] }}
                    transition={{
                      opacity: { delay: 0.03 * wi, duration: 0.18 },
                      scale: { delay: 0.03 * wi, duration: 0.18 },
                      y: { delay: 0.25 + 0.1 * wi, duration: 2.5 + wi * 0.2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="aspect-square rounded-md flex items-end justify-center pb-1 overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${w.color}dd, ${w.color}88)`,
                      border: `1px solid ${w.color}40`,
                    }}
                  >
                    <span className="text-[7px] text-white/80 font-medium drop-shadow-sm" style={{ fontFamily: "var(--font-display)" }}>
                      {w.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
