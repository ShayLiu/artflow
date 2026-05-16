"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MASTERS = [
  {
    name: "莫兰迪",
    en: "Morandi",
    prompt: "in the style of Giorgio Morandi, muted earthy tones, soft light, still life composition, quiet elegance, desaturated palette",
    color: "#c4bbb3",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Giorgio_Morandi.jpg/200px-Giorgio_Morandi.jpg",
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
    en: "Picasso",
    prompt: "in the style of Pablo Picasso, cubism, geometric fragmentation, multiple viewpoints, bold outlines, abstract figurative",
    color: "#a08b8b",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/200px-Pablo_picasso_1.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg",
      "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
      "https://upload.wikimedia.org/wikipedia/en/1/1f/Woman_in_Hat_and_Fur_Collar.jpg",
      "https://upload.wikimedia.org/wikipedia/en/f/f4/The_Weeping_Woman.jpg",
      "https://upload.wikimedia.org/wikipedia/en/a/a5/El_Sueno.jpg",
      "https://upload.wikimedia.org/wikipedia/en/9/9c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York.jpg",
    ],
  },
  {
    name: "莫奈",
    en: "Monet",
    prompt: "in the style of Claude Monet, impressionism, soft brushstrokes, natural light, plein air, water reflections, atmospheric",
    color: "#8fa08b",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/200px-Claude_Monet_1899_Nadar_crop.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/300px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Claude_Monet%2C_Impression%2C_soleil_levant%2C_1872.jpg/300px-Claude_Monet%2C_Impression%2C_soleil_levant%2C_1872.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/200px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Claude_Monet_-_The_Japanese_Footbridge_and_the_Water_Lily_Pool%2C_Giverny_-_Google_Art_Project.jpg/300px-Claude_Monet_-_The_Japanese_Footbridge_and_the_Water_Lily_Pool%2C_Giverny_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Monet_-_Im_Garten_-_1895.jpg/200px-Monet_-_Im_Garten_-_1895.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Monet_-_Wildenstein_1996%2C_1596.png/300px-Monet_-_Wildenstein_1996%2C_1596.png",
    ],
  },
  {
    name: "梵高",
    en: "Van Gogh",
    prompt: "in the style of Vincent van Gogh, post-impressionism, swirling brushstrokes, vivid colors, expressive texture, starry night",
    color: "#8b8ea0",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/200px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/300px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_Willem_van_Gogh_128.jpg/200px-Vincent_Willem_van_Gogh_128.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/300px-Irises-Vincent_van_Gogh.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Vincent_van_Gogh_-_Wheatfield_Under_Thunderclouds_-_VGM_F778.jpg/300px-Vincent_van_Gogh_-_Wheatfield_Under_Thunderclouds_-_VGM_F778.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_van_Gogh_-_National_Gallery_of_Art.JPG/200px-Vincent_van_Gogh_-_National_Gallery_of_Art.JPG",
    ],
  },
  {
    name: "草间弥生",
    en: "Kusama",
    prompt: "in the style of Yayoi Kusama, infinity dots, polka dot patterns, bold repetition, vivid red and white, psychedelic",
    color: "#c27171",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Yayoi_Kusama_cropped_2_Yayoi_Kusama_201611.jpg/200px-Yayoi_Kusama_cropped_2_Yayoi_Kusama_201611.jpg",
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
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Hokusai_portrait.png/200px-Hokusai_portrait.png",
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
    en: "Dalí",
    prompt: "in the style of Salvador Dalí, surrealism, melting clocks, dreamscape, hyper-detailed, bizarre juxtaposition",
    color: "#b0a090",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/200px-Salvador_Dal%C3%AD_1939.jpg",
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
    en: "Klimt",
    prompt: "in the style of Gustav Klimt, Art Nouveau, gold leaf, ornamental patterns, sensual figures, decorative mosaic",
    color: "#c8b060",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gustav_Klimt_1862.jpg/200px-Gustav_Klimt_1862.jpg",
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
    en: "Mondrian",
    prompt: "in the style of Piet Mondrian, De Stijl, primary colors, black grid lines, geometric abstraction, neoplasticism",
    color: "#d4c44c",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Piet_Mondriaan.jpg/200px-Piet_Mondriaan.jpg",
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
    en: "Matisse",
    prompt: "in the style of Henri Matisse, fauvism, bold flat colors, expressive cutouts, joyful composition, decorative patterns",
    color: "#8aba8a",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Henri_Matisse%2C_1933%2C_May_20%2C_photo_by_Carl_Van_Vechten.jpg/200px-Henri_Matisse%2C_1933%2C_May_20%2C_photo_by_Carl_Van_Vechten.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-Woman-with-a-Hat.jpg",
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-Woman-with-a-Hat.jpg",
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Matisse-The-Dance-first-version.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/0a/Matisse-Woman-with-a-Hat.jpg",
    ],
  },
  {
    name: "伦勃朗",
    en: "Rembrandt",
    prompt: "in the style of Rembrandt, chiaroscuro, dramatic lighting, Dutch Golden Age, rich dark tones, portrait mastery",
    color: "#8a7a60",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/200px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/300px-The_Night_Watch_-_HD.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/200px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Rembrandt_Harmensz._van_Rijn_007.jpg/200px-Rembrandt_Harmensz._van_Rijn_007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/250px-The_Night_Watch_-_HD.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/250px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Rembrandt_Harmensz._van_Rijn_007.jpg/250px-Rembrandt_Harmensz._van_Rijn_007.jpg",
    ],
  },
  {
    name: "维米尔",
    en: "Vermeer",
    prompt: "in the style of Johannes Vermeer, soft natural light, domestic interiors, luminous colors, photographic precision, pearl-like glow",
    color: "#a0b0c0",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg/200px-Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg",
    works: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg/200px-Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vermeer-_The_Milkmaid.jpg/200px-Vermeer-_The_Milkmaid.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg/250px-Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vermeer-_The_Milkmaid.jpg/250px-Vermeer-_The_Milkmaid.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg/180px-Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vermeer-_The_Milkmaid.jpg/180px-Vermeer-_The_Milkmaid.jpg",
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
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute z-[1001] top-1/2 -translate-y-1/2 w-5 h-10 flex items-center justify-center rounded-r-lg text-[#7a7470] hover:text-[#3d3a36] transition-colors"
        style={{
          left: collapsed ? 0 : 56,
          background: "rgba(250,248,246,0.45)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          borderRight: "1px solid rgba(255,255,255,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          transition: "left 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </motion.button>

      {/* Panel */}
      <motion.div
        animate={{ x: collapsed ? -52 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-[999] w-[54px] overflow-hidden rounded-2xl"
        style={{
          maxHeight: "min(520px, calc(100vh - 100px))",
          background: "rgba(250, 248, 246, 0.3)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <div className="overflow-y-auto py-2 px-0.5" style={{ scrollbarWidth: "none", maxHeight: "min(520px, calc(100vh - 100px))" }}>
          <div className="flex flex-col gap-2.5 items-center">
            {MASTERS.map((m, i) => {
              const isSelected = selectedMaster === m.prompt;

              return (
                <motion.button
                  key={m.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -1.5, 0] }}
                  transition={{
                    opacity: { delay: 0.06 * i, duration: 0.3 },
                    y: { delay: 1.5 + 0.25 * i, duration: 3.5 + i * 0.15, repeat: Infinity, ease: "easeInOut" },
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
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
                        `0 0 5px ${m.color}30, 0 0 10px ${m.color}10`,
                        `0 0 12px ${m.color}50, 0 0 20px ${m.color}20`,
                        `0 0 5px ${m.color}30, 0 0 10px ${m.color}10`,
                      ],
                    } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Avatar - real photo */}
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden transition-all duration-500"
                    style={{ boxShadow: isSelected ? `0 0 0 2px ${m.color}` : "none" }}
                  >
                    <motion.img
                      src={m.avatar}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      animate={isSelected ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      loading="lazy"
                    />
                  </div>

                  {/* Name */}
                  <motion.p
                    className="text-[7px] mt-0.5 leading-tight text-center max-w-[48px] truncate"
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
            initial={{ opacity: 0, x: -8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-[68px] top-1/2 -translate-y-1/2 z-[998]"
          >
            <div
              className="rounded-2xl p-3 w-[210px]"
              style={{
                background: "rgba(250, 248, 246, 0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: `0 8px 32px ${MASTERS[hovered].color}15, 0 2px 8px rgba(0,0,0,0.04)`,
              }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <img src={MASTERS[hovered].avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#3d3a36]" style={{ fontFamily: "var(--font-display)" }}>
                    {MASTERS[hovered].name}
                  </p>
                  <p className="text-[8px] text-[#7a7470] tracking-wide">{MASTERS[hovered].en}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {MASTERS[hovered].works.map((url, wi) => (
                  <motion.div
                    key={wi}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -1.2, 0] }}
                    transition={{
                      opacity: { delay: 0.03 * wi, duration: 0.2 },
                      scale: { delay: 0.03 * wi, duration: 0.2 },
                      y: { delay: 0.3 + 0.12 * wi, duration: 2.8 + wi * 0.25, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="aspect-square rounded-lg overflow-hidden"
                    style={{ border: `1px solid ${MASTERS[hovered].color}25` }}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
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
