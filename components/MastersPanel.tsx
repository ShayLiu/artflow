"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MASTERS = [
  {
    name: "莫兰迪",
    en: "Morandi",
    prompt: "in the style of Giorgio Morandi, muted earthy tones, soft light, still life composition, quiet elegance, desaturated palette",
    color: "#c4bbb3",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Giorgio_Morandi_-_Natura_Morta_1956.jpg/300px-Giorgio_Morandi_-_Natura_Morta_1956.jpg",
  },
  {
    name: "毕加索",
    en: "Picasso",
    prompt: "in the style of Pablo Picasso, cubism, geometric fragmentation, multiple viewpoints, bold outlines, abstract figurative",
    color: "#a08b8b",
    preview: "https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg",
  },
  {
    name: "莫奈",
    en: "Monet",
    prompt: "in the style of Claude Monet, impressionism, soft brushstrokes, natural light, plein air, water reflections, atmospheric",
    color: "#8fa08b",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/300px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
  },
  {
    name: "梵高",
    en: "Van Gogh",
    prompt: "in the style of Vincent van Gogh, post-impressionism, swirling brushstrokes, vivid colors, expressive texture, starry night",
    color: "#8b8ea0",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/300px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    name: "草间弥生",
    en: "Kusama",
    prompt: "in the style of Yayoi Kusama, infinity dots, polka dot patterns, bold repetition, vivid red and white, psychedelic",
    color: "#c27171",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg/300px-Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg",
  },
  {
    name: "浮世绘",
    en: "Hokusai",
    prompt: "in the style of Hokusai, Japanese ukiyo-e woodblock print, The Great Wave, traditional Japanese art, detailed linework",
    color: "#7a8a9a",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/300px-Tsunami_by_hokusai_19th_century.jpg",
  },
  {
    name: "达利",
    en: "Dalí",
    prompt: "in the style of Salvador Dalí, surrealism, melting clocks, dreamscape, hyper-detailed, bizarre juxtaposition",
    color: "#b0a090",
    preview: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
  },
  {
    name: "克里姆特",
    en: "Klimt",
    prompt: "in the style of Gustav Klimt, Art Nouveau, gold leaf, ornamental patterns, sensual figures, decorative mosaic",
    color: "#c8b060",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/300px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
  },
  {
    name: "蒙德里安",
    en: "Mondrian",
    prompt: "in the style of Piet Mondrian, De Stijl, primary colors, black grid lines, geometric abstraction, neoplasticism",
    color: "#d4c44c",
    preview: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg/300px-Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg",
  },
  {
    name: "马蒂斯",
    en: "Matisse",
    prompt: "in the style of Henri Matisse, fauvism, bold flat colors, expressive cutouts, joyful composition, decorative patterns",
    color: "#8aba8a",
    preview: "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
  },
];

interface MastersPanelProps {
  selectedMaster: string;
  onSelectMaster: (prompt: string) => void;
}

export function MastersPanel({ selectedMaster, onSelectMaster }: MastersPanelProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.4 }}
      className="absolute left-3 top-1/2 -translate-y-1/2 z-[999] w-[72px] max-h-[calc(100vh-100px)] overflow-y-auto rounded-2xl glass-panel py-3 px-1.5"
      style={{ scrollbarWidth: "none" }}
    >
      <p
        className="text-[9px] text-[#7a7470] text-center mb-2 tracking-[0.12em] uppercase font-medium"
        style={{ fontFamily: "var(--font-display)", writingMode: "horizontal-tb" }}
      >
        大师
      </p>

      <div className="flex flex-col gap-2 items-center">
        {MASTERS.map((m, i) => {
          const isSelected = selectedMaster === m.prompt;
          const isHovered = hovered === i;

          return (
            <motion.button
              key={m.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.06 * i, type: "spring", stiffness: 250, damping: 18 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => onSelectMaster(isSelected ? "" : m.prompt)}
              className="relative group"
            >
              {/* Breathing glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-xl"
                animate={isSelected ? {
                  boxShadow: [
                    `0 0 8px ${m.color}40`,
                    `0 0 16px ${m.color}60`,
                    `0 0 8px ${m.color}40`,
                  ]
                } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Image card */}
              <div
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-[#8b7e74] shadow-lg"
                    : "border-transparent hover:border-[#8b7e74]/30"
                }`}
              >
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundColor: m.color, backgroundImage: `url(${m.preview})` }}
                  animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Name label */}
              <motion.div
                className="mt-1 text-center"
                animate={isSelected ? { opacity: 1 } : { opacity: 0.7 }}
              >
                <p className="text-[9px] font-medium text-[#3d3a36] leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}>
                  {m.name}
                </p>
              </motion.div>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, x: -4, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 glass-panel rounded-lg px-2.5 py-1.5 whitespace-nowrap z-50"
                  >
                    <p className="text-[10px] font-medium text-[#3d3a36]">{m.name}</p>
                    <p className="text-[9px] text-[#7a7470]">{m.en}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
