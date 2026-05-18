import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const imagePrompts = [
  {
    name: "hero-bg",
    prompt: "Mobile phone wallpaper portrait orientation 9:16 aspect ratio, IPL cricket stadium at night with dramatic purple and gold lighting, crowd cheering silhouettes at bottom, cricket bat and ball floating with golden glow particles at center, very dark cinematic background, vibrant neon accents, vertical composition optimized for smartphone screen"
  },
  {
    name: "match-bg",
    prompt: "Mobile phone wallpaper portrait orientation 9:16 aspect ratio, dynamic cricket batsman silhouette hitting a six in center, stadium lights creating dramatic vertical rays, purple and orange color scheme, abstract geometric patterns, very dark background with glowing elements, IPL tournament aesthetic, vertical mobile composition"
  },
  {
    name: "leaderboard-bg",
    prompt: "Mobile phone wallpaper portrait orientation 9:16 aspect ratio, IPL golden trophy at center top, podium with rank numbers 1 2 3 below, purple and gold neon lights, vertical dark gaming aesthetic background, floating stats numbers, optimized for smartphone vertical screen"
  },
  {
    name: "rewards-bg",
    prompt: "Mobile phone wallpaper portrait orientation 9:16 aspect ratio, cricket themed treasure chest opening at center with golden coins and cricket balls flying upward, IPL purple and gold color scheme, magical particle effects, very dark background, vertical gaming rewards composition for mobile"
  },
  {
    name: "prediction-bg",
    prompt: "Mobile phone wallpaper portrait orientation 9:16 aspect ratio, futuristic holographic cricket batsman silhouette at center, prediction target crosshair overlay, data visualization elements, very dark theme with blue and purple IPL accent colors, vertical mobile optimized composition"
  },
  {
    name: "profile-bg",
    prompt: "Mobile phone wallpaper portrait orientation 9:16 aspect ratio, circular avatar frame with golden laurel wreath at top center, IPL purple gradient background, achievement badge icons floating around, level-up particle effects, very dark gaming aesthetic, vertical smartphone composition"
  }
];

async function generateImage(promptText, outputName) {
  try {
    console.log(`🎨 Generating: ${outputName}...`);

    const response = await client.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: promptText,
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || "image/png";
          const extension = mimeType.split("/")[1] || "png";

          const outputDir = path.join(process.cwd(), "public", "images");
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          const outputPath = path.join(outputDir, `${outputName}.${extension}`);
          fs.writeFileSync(outputPath, Buffer.from(imageData, "base64"));
          console.log(`   ✓ Saved: public/images/${outputName}.${extension}`);
          return outputPath;
        }
      }
    }

    console.log(`   ⚠ No image generated for ${outputName}`);
    return null;
  } catch (error) {
    console.error(`   ✗ Error generating ${outputName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("\n🏏 FanForge IPL Image Generator\n");
  console.log("Using Gemini 2.0 Flash Image Generation\n");
  console.log("─".repeat(50));

  let successCount = 0;

  for (const { name, prompt } of imagePrompts) {
    const result = await generateImage(prompt, name);
    if (result) successCount++;
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("─".repeat(50));
  console.log(`\n✅ Complete! Generated ${successCount}/${imagePrompts.length} images\n`);
}

main().catch(console.error);
