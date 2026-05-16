"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MASTERS = [
  {
    name: "莫兰迪",
    en: "Giorgio Morandi",
    prompt: "in the style of Giorgio Morandi, muted earthy tones, soft light, still life composition, quiet elegance, desaturated palette",
    color: "#c4bbb3",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Giorgio_Morandi_-_Natura_Morta_1956.jpg/200px-Giorgio_Morandi_-_Natura_Morta_1956.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Giorgio_Morandi_-_Natura_Morta_1956.jpg/300px-Giorgio_Morandi_-_Natura_Morta_1956.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Giorgio_Morandi_-_Natura_Morta_%281946%29.jpg/300px-Giorgio_Morandi_-_Natura_Morta_%281946%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Giorgio_Morandi_-_Natura_Morta_1951.jpg/300px-Giorgio_Morandi_-_Natura_Morta_1951.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Morandi_-_Natura_morta%2C_1956.jpg/300px-Morandi_-_Natura_morta%2C_1956.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Giorgio_Morandi_-_Paesaggio_%281943%29.jpg/300px-Giorgio_Morandi_-_Paesaggio_%281943%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Giorgio_Morandi_-_Natura_Morta_1956.jpg/250px-Giorgio_Morandi_-_Natura_Morta_1956.jpg",
    ],
  },
  {
    name: "毕加索",
    en: "Pablo Picasso",
    prompt: "in the style of Pablo Picasso, cubism, geometric fragmentation, multiple viewpoints, bold outlines, abstract figurative",
    color: "#a08b8b",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/200px-Les_Demoiselles_d%27Avignon.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg",
      "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
      "https://upload.wikimedia.org/wikipedia/en/1/1f/Woman_in_Hat_and_Fur_Collar.jpg",
      "https://upload.wikimedia.org/wikipedia/en/a/a5/El_Sueno.jpg",
      "https://upload.wikimedia.org/wikipedia/en/9/9c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York.jpg",
      "https://upload.wikimedia.org/wikipedia/en/f/f4/The_Weeping_Woman.jpg",
    ],
  },
  {
    name: "莫奈",
    en: "Claude Monet",
    prompt: "in the style of Claude Monet, impressionism, soft brushstrokes, natural light, plein air, water reflections, atmospheric",
    color: "#8fa08b",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/200px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/300px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Claude_Monet%2C_Impression%2C_soleil_levant%2C_1872.jpg/300px-Claude_Monet%2C_Impression%2C_soleil_levant%2C_1872.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/200px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Claude_Monet_-_The_Japanese_Footbridge_and_the_Water_Lily_Pool%2C_Giverny_-_Google_Art_Project.jpg/300px-Claude_Monet_-_The_Japanese_Footbridge_and_the_Water_Lily_Pool%2C_Giverny_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Monet_-_Wildenstein_1996%2C_1596.png/300px-Monet_-_Wildenstein_1996%2C_1596.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Monet_-_Im_Garten_-_1895.jpg/200px-Monet_-_Im_Garten_-_1895.jpg",
    ],
  },
  {
    name: "梵高",
    en: "Vincent van Gogh",
    prompt: "in the style of Vincent van Gogh, post-impressionism, swirling brushstrokes, vivid colors, expressive texture, starry night",
    color: "#8b8ea0",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/300px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_van_Gogh_-_National_Gallery_of_Art.JPG/200px-Vincent_van_Gogh_-_National_Gallery_of_Art.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_Willem_van_Gogh_128.jpg/200px-Vincent_Willem_van_Gogh_128.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/300px-Irises-Vincent_van_Gogh.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Vincent_van_Gogh_-_Wheatfield_Under_Thunderclouds_-_VGM_F778.jpg/300px-Vincent_van_Gogh_-_Wheatfield_Under_Thunderclouds_-_VGM_F778.jpg",
    ],
  },
  {
    name: "草间弥生",
    en: "Yayoi Kusama",
    prompt: "in the style of Yayoi Kusama, infinity dots, polka dot patterns, bold repetition, vivid red and white, psychedelic",
    color: "#c27171",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg/200px-Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg/300px-Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pumpkin_%28Kusama%29.jpg/200px-Pumpkin_%28Kusama%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Yayoi_Kusama%2C_All_the_Eternal_Love_I_Have_for_the_Pumpkins%2C_2016%2C_Hirshhorn_Museum_and_Sculpture_Garden.jpg/300px-Yayoi_Kusama%2C_All_the_Eternal_Love_I_Have_for_the_Pumpkins%2C_2016%2C_Hirshhorn_Museum_and_Sculpture_Garden.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg/250px-Yayoi_Kusama_-_Ascension_of_Polkadots_on_the_Trees_-_Espoo_4.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pumpkin_%28Kusama%29.jpg/250px-Pumpkin_%28Kusama%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Yayoi_Kusama%2C_All_the_Eternal_Love_I_Have_for_the_Pumpkins%2C_2016%2C_Hirshhorn_Museum_and_Sculpture_Garden.jpg/250px-Yayoi_Kusama%2C_All_the_Eternal_Love_I_Have_for_the_Pumpkins%2C_2016%2C_Hirshhorn_Museum_and_Sculpture_Garden.jpg",
    ],
  },
  {
    name: "北斋",
    en: "Hokusai",
    prompt: "in the style of Hokusai, Japanese ukiyo-e woodblock print, The Great Wave, traditional Japanese art, detailed linework",
    color: "#7a8a9a",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/200px-Tsunami_by_hokusai_19th_century.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/300px-Tsunami_by_hokusai_19th_century.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Red_Fuji_southern_wind_clear_morning.jpg/300px-Red_Fuji_southern_wind_clear_morning.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Katsushika_Hokusai_-_Thunderstorm_Beneath_the_Summit_-_Google_Art_Project.jpg/300px-Katsushika_Hokusai_-_Thunderstorm_Beneath_the_Summit_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/250px-Tsunami_by_hokusai_19th_century.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Red_Fuji_southern_wind_clear_morning.jpg/250px-Red_Fuji_southern_wind_clear_morning.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Katsushika_Hokusai_-_Thunderstorm_Beneath_the_Summit_-_Google_Art_Project.jpg/250px-Katsushika_Hokusai_-_Thunderstorm_Beneath_the_Summit_-_Google_Art_Project.jpg",
    ],
  },
  {
    name: "达利",
    en: "Salvador Dalí",
    prompt: "in the style of Salvador Dalí, surrealism, melting clocks, dreamscape, hyper-detailed, bizarre juxtaposition",
    color: "#b0a090",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/The_Persistence_of_Memory.jpg/200px-The_Persistence_of_Memory.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
      "https://upload.wikimedia.org/wikipedia/en/3/3c/Swans_Reflecting_Elephants.jpg",
      "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
      "https://upload.wikimedia.org/wikipedia/en/3/3c/Swans_Reflecting_Elephants.jpg",
      "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
      "https://upload.wikimedia.org/wikipedia/en/3/3c/Swans_Reflecting_Elephants.jpg",
    ],
  },
  {
    name: "克里姆特",
    en: "Gustav Klimt",
    prompt: "in the style of Gustav Klimt, Art Nouveau, gold leaf, ornamental patterns, sensual figures, decorative mosaic",
    color: "#c8b060",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/200px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/250px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gustav_Klimt_046.jpg/200px-Gustav_Klimt_046.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gustav_Klimt_039.jpg/200px-Gustav_Klimt_039.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/200px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gustav_Klimt_046.jpg/250px-Gustav_Klimt_046.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gustav_Klimt_039.jpg/250px-Gustav_Klimt_039.jpg",
    ],
  },
  {
    name: "蒙德里安",
    en: "Piet Mondrian",
    prompt: "in the style of Piet Mondrian, De Stijl, primary colors, black grid lines, geometric abstraction, neoplasticism",
    color: "#d4c44c",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg/200px-Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg/250px-Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tableau_I%2C_by_Piet_Mondriaan.jpg/200px-Tableau_I%2C_by_Piet_Mondriaan.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg/200px-Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tableau_I%2C_by_Piet_Mondriaan.jpg/250px-Tableau_I%2C_by_Piet_Mondriaan.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg/180px-Piet_Mondriaan%2C_1930_-_Mondrian_Composition_II_in_Red%2C_Blue%2C_and_Yellow.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tableau_I%2C_by_Piet_Mondriaan.jpg/180px-Tableau_I%2C_by_Piet_Mondriaan.jpg",
    ],
  },
  {
    name: "马蒂斯",
    en: "Henri Matisse",
    prompt: "in the style of Henri Matisse, fauvism, bold flat colors, expressive cutouts, joyful composition, decorative patterns",
    color: "#8aba8a",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Matisse-The-Dance-first-version.jpg/200px-Matisse-The-Dance-first-version.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-Woman-with-a-Hat.jpg",
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-Woman-with-a-Hat.jpg",
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-Woman-with-a-Hat.jpg",
    ],
  },
];

interface MastersPanelProps {
  selectedMaster: string;
  onSelectMaster: (prompt: string) => void;
}

export function MastersPanel({ selectedMaster, onSelectMaster }: MastersPanelProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Left vertical strip */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.5 }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-[999] w-[60px] max-h-[calc(100vh-80px)] overflow-y-auto rounded-2xl py-3 px-1"
        style={{
          scrollbarWidth: "none",
          background: "rgba(250, 248, 246, 0.35)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <div className="flex flex-col gap-3 items-center">
          {MASTERS.map((m, i) => {
            const isSelected = selectedMaster === m.prompt;
            const isHovered = hovered === i;

            return (
              <motion.button
                key={m.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: [0, -2, 0],
                }}
                transition={{
                  opacity: { delay: 0.08 * i, duration: 0.4 },
                  y: { delay: 1 + 0.3 * i, duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.85 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => onSelectMaster(isSelected ? "" : m.prompt)}
                className="relative flex flex-col items-center"
              >
                {/* Breathing glow */}
                <motion.div
                  className="absolute -inset-1.5 rounded-2xl"
                  animate={isSelected ? {
                    boxShadow: [
                      `0 0 6px ${m.color}30, 0 0 12px ${m.color}15`,
                      `0 0 14px ${m.color}50, 0 0 24px ${m.color}25`,
                      `0 0 6px ${m.color}30, 0 0 12px ${m.color}15`,
                    ],
                  } : isHovered ? {
                    boxShadow: `0 0 10px ${m.color}30`,
                  } : {
                    boxShadow: "0 0 0px transparent",
                  }}
                  transition={{ duration: 2.5, repeat: isSelected ? Infinity : 0, ease: "easeInOut" }}
                />

                {/* Avatar */}
                <div className={`w-12 h-12 rounded-xl overflow-hidden transition-all duration-500 ${
                  isSelected ? "shadow-md" : ""
                }`} style={{ boxShadow: isSelected ? `0 0 0 2px ${m.color}` : "none" }}>
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundColor: m.color, backgroundImage: `url(${m.avatar})` }}
                    animate={isSelected ? { scale: [1, 1.08, 1] } : isHovered ? { scale: 1.06 } : { scale: 1 }}
                    transition={isSelected ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                  />
                </div>

                {/* Name */}
                <motion.p
                  className="text-[8px] mt-1 leading-tight text-center"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: isSelected ? "#3d3a36" : "#7a7470",
                    fontWeight: isSelected ? 600 : 400,
                  }}
                  animate={{ opacity: isSelected || isHovered ? 1 : 0.6 }}
                >
                  {m.name}
                </motion.p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Hover gallery - 6 masterworks floating right */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute left-[76px] top-1/2 -translate-y-1/2 z-[998]"
          >
            <div
              className="rounded-2xl p-3 w-[200px]"
              style={{
                background: "rgba(250, 248, 246, 0.55)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: `0 8px 32px ${MASTERS[hovered].color}18, 0 2px 8px rgba(0,0,0,0.05)`,
              }}
            >
              {/* Artist name header */}
              <div className="mb-2.5">
                <p className="text-xs font-medium text-[#3d3a36]" style={{ fontFamily: "var(--font-display)" }}>
                  {MASTERS[hovered].name}
                </p>
                <p className="text-[9px] text-[#7a7470] tracking-wide">{MASTERS[hovered].en}</p>
              </div>

              {/* 6 works grid: 3x2 */}
              <div className="grid grid-cols-3 gap-1.5">
                {MASTERS[hovered].works.map((url, wi) => (
                  <motion.div
                    key={wi}
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -1.5, 0] }}
                    transition={{
                      opacity: { delay: 0.04 * wi, duration: 0.25 },
                      scale: { delay: 0.04 * wi, duration: 0.25 },
                      y: { delay: 0.5 + 0.15 * wi, duration: 2.5 + wi * 0.3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{
                      border: `1px solid ${MASTERS[hovered].color}30`,
                    }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundColor: MASTERS[hovered].color,
                        backgroundImage: `url(${url})`,
                      }}
                    />
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
