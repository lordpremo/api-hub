import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const apis = [
  { path: "/api/image/edit", name: "Image Edit", desc: "Edit image based on text instructions" },
  { path: "/api/image/generate", name: "Image Generate", desc: "Generate image from text" },
  { path: "/api/image/upscale", name: "Image Upscale", desc: "Upscale image quality" },
  { path: "/api/image/cartoon", name: "Cartoonizer", desc: "Turn face/photo into cartoon style" },
  { path: "/api/image/bg-remove", name: "Background Remover", desc: "Remove image background" },
  { path: "/api/image/blur-bg", name: "Blur Background", desc: "Blur background, keep subject clear" },
  { path: "/api/image/grayscale", name: "Grayscale Filter", desc: "Convert image to black & white" },
  { path: "/api/image/thumbnail", name: "Thumbnail Maker", desc: "Generate YouTube-style thumbnail" },
  { path: "/api/image/meme", name: "Meme Generator", desc: "Add top/bottom text to image" },
  { path: "/api/image/watermark", name: "Watermark", desc: "Add watermark text/logo" },

  { path: "/api/video/generate", name: "Video Generate", desc: "Generate short video from text" },
  { path: "/api/video/caption", name: "Auto Caption", desc: "Generate captions for video" },
  { path: "/api/video/thumbnail", name: "Video Thumbnail", desc: "Extract thumbnail from video" },
  { path: "/api/video/trim", name: "Video Trim", desc: "Cut video between timestamps" },
  { path: "/api/video/info", name: "Video Info", desc: "Get basic video metadata" },

  { path: "/api/ai/chat", name: "AI Chat", desc: "General AI chat completion (stub)" },
  { path: "/api/ai/summarize", name: "Summarizer", desc: "Summarize long text" },
  { path: "/api/ai/translate", name: "Translator", desc: "Translate text between languages" },
  { path: "/api/ai/rewrite", name: "Rewriter", desc: "Rewrite text in different style" },
  { path: "/api/ai/hashtag", name: "Hashtag Generator", desc: "Generate social media hashtags" },
  { path: "/api/ai/caption", name: "Caption Generator", desc: "Generate captions for posts" },
  { path: "/api/ai/idea", name: "Idea Generator", desc: "Generate content ideas" },
  { path: "/api/ai/bio", name: "Bio Generator", desc: "Generate social media bio" },
  { path: "/api/ai/title", name: "Title Generator", desc: "Generate catchy titles" },
  { path: "/api/ai/keywords", name: "Keyword Extractor", desc: "Extract keywords from text" },

  { path: "/api/search/web", name: "Web Search", desc: "Search the web (stub)" },
  { path: "/api/search/image", name: "Image Search", desc: "Search images (stub)" },
  { path: "/api/search/news", name: "News Search", desc: "Search latest news (stub)" },
  { path: "/api/search/wiki", name: "Wikipedia Search", desc: "Search Wikipedia (stub)" },
  { path: "/api/search/music", name: "Music Search", desc: "Search music metadata (stub)" },

  { path: "/api/tools/qr", name: "QR Generator", desc: "Generate QR code from text/url (stub)" },
  { path: "/api/tools/shortlink", name: "Short Link", desc: "Shorten long URL (stub)" },
  { path: "/api/tools/password", name: "Password Generator", desc: "Generate strong password" },
  { path: "/api/tools/uuid", name: "UUID Generator", desc: "Generate random UUID" },
  { path: "/api/tools/slug", name: "Slugify", desc: "Convert text to URL slug" },
  { path: "/api/tools/base64/encode", name: "Base64 Encode", desc: "Encode text to base64" },
  { path: "/api/tools/base64/decode", name: "Base64 Decode", desc: "Decode base64 to text" },
  { path: "/api/tools/text/length", name: "Text Length", desc: "Count characters & words" },
  { path: "/api/tools/text/case", name: "Text Case Converter", desc: "UPPER / lower / Title Case" },
  { path: "/api/tools/json/pretty", name: "JSON Pretty", desc: "Format JSON nicely" },

  { path: "/api/social/yt-metadata", name: "YouTube Metadata", desc: "Get basic YouTube video info (stub)" },
  { path: "/api/social/ig-metadata", name: "Instagram Metadata", desc: "Get basic IG post info (stub)" },
  { path: "/api/social/tiktok-metadata", name: "TikTok Metadata", desc: "Get basic TikTok info (stub)" },

  { path: "/api/info/ping", name: "Ping", desc: "Check API status" },
  { path: "/api/info/time", name: "Server Time", desc: "Get current server time" },
  { path: "/api/info/ip", name: "IP Echo", desc: "Return requester IP" },
  { path: "/api/info/headers", name: "Headers Echo", desc: "Return request headers" },
  { path: "/api/info/echo", name: "Echo", desc: "Return posted JSON" }
];

// Landing page
app.get("/", (req, res) => {
  const base = process.env.API_BASE_URL || `http://localhost:${PORT}`;
  const rows = apis
    .map(
      (api) => `
      <tr>
        <td><code>${api.path}</code></td>
        <td>${api.name}</td>
        <td>${api.desc}</td>
        <td><a href="${base}${api.path}" target="_blank">Test</a></td>
      </tr>`
    )
    .join("");

  res.send(`
    <html>
      <head>
        <title>BROKEN LORD API HUB</title>
        <style>
          body { background:#020617;color:#e5e7eb;font-family:system-ui,sans-serif;padding:20px; }
          h1 { color:#22d3ee;text-align:center;text-shadow:0 0 12px #22d3eeaa; }
          table { width:100%;border-collapse:collapse;margin-top:20px;font-size:14px; }
          th, td { border:1px solid #1f2937;padding:8px; }
          th { background:#0f172a;color:#e5e7eb; }
          tr:nth-child(even){ background:#020617; }
          tr:nth-child(odd){ background:#020617dd; }
          code { color:#a5f3fc; }
          a { color:#38bdf8;text-decoration:none; }
          a:hover { text-decoration:underline; }
        </style>
      </head>
      <body>
        <h1>🔥 BROKEN LORD CMD — API HUB (50 ENDPOINTS) 🔥</h1>
        <p style="text-align:center;">Kila endpoint inajibu. Baadhi zina logic kamili, zingine ni stubs za kupanuliwa.</p>
        <table>
          <tr>
            <th>Endpoint</th>
            <th>Name</th>
            <th>Description</th>
            <th>Test</th>
          </tr>
          ${rows}
        </table>
      </body>
    </html>
  `);
});

// ===== REAL LOGIC ENDPOINTS =====

// Info
app.get("/api/info/ping", (req, res) => {
  res.json({ status: "ok", message: "BROKEN LORD API HUB is alive" });
});

app.get("/api/info/time", (req, res) => {
  res.json({ server_time: new Date().toISOString() });
});

app.get("/api/info/ip", (req, res) => {
  res.json({ ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress });
});

app.get("/api/info/headers", (req, res) => {
  res.json({ headers: req.headers });
});

app.post("/api/info/echo", (req, res) => {
  res.json({ you_sent: req.body });
});

// Text tools
app.post("/api/tools/text/length", (req, res) => {
  const { text = "" } = req.body || {};
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  res.json({ text, chars, words });
});

app.post("/api/tools/text/case", (req, res) => {
  const { text = "", mode = "upper" } = req.body || {};
  let result = text;
  if (mode === "upper") result = text.toUpperCase();
  else if (mode === "lower") result = text.toLowerCase();
  else if (mode === "title")
    result = text
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  res.json({ mode, result });
});

app.post("/api/tools/base64/encode", (req, res) => {
  const { text = "" } = req.body || {};
  const encoded = Buffer.from(text, "utf8").toString("base64");
  res.json({ text, encoded });
});

app.post("/api/tools/base64/decode", (req, res) => {
  const { encoded = "" } = req.body || {};
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    res.json({ encoded, decoded });
  } catch {
    res.status(400).json({ error: "Invalid base64" });
  }
});

app.get("/api/tools/password", (req, res) => {
  const length = Number(req.query.length) || 12;
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  res.json({ length, password: pass });
});

app.get("/api/tools/uuid", (req, res) => {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  res.json({ uuid });
});

app.post("/api/tools/slug", (req, res) => {
  const { text = "" } = req.body || {};
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  res.json({ text, slug });
});

app.post("/api/tools/json/pretty", (req, res) => {
  try {
    const { json } = req.body || {};
    const obj = typeof json === "string" ? JSON.parse(json) : json;
    const pretty = JSON.stringify(obj, null, 2);
    res.json({ pretty });
  } catch {
    res.status(400).json({ error: "Invalid JSON" });
  }
});

// AI text utilities (simple logic)
app.post("/api/ai/summarize", (req, res) => {
  const { text = "" } = req.body || {};
  const summary =
    text.length > 150 ? text.slice(0, 147) + "..." : text || "No text provided.";
  res.json({ summary });
});

app.post("/api/ai/translate", (req, res) => {
  const { text = "", to = "sw" } = req.body || {};
  res.json({
    note: "Stub translator. Plug real model later.",
    to,
    original: text,
    translated: text
  });
});

app.post("/api/ai/rewrite", (req, res) => {
  const { text = "", style = "casual" } = req.body || {};
  res.json({
    note: "Stub rewriter. Plug real model later.",
    style,
    original: text,
    rewritten: text
  });
});

app.post("/api/ai/hashtag", (req, res) => {
  const { text = "" } = req.body || {};
  const base = text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .map((w) => "#" + w.replace(/[^a-z0-9]/g, ""));
  res.json({ hashtags: base });
});

app.post("/api/ai/caption", (req, res) => {
  const { topic = "" } = req.body || {};
  res.json({
    caption: topic
      ? `🔥 ${topic} — powered by BROKEN LORD CMD.`
      : "🔥 Powered by BROKEN LORD CMD."
  });
});

app.post("/api/ai/idea", (req, res) => {
  const { niche = "content" } = req.body || {};
  res.json({
    ideas: [
      `Create a mini-series about ${niche}.`,
      `Share behind-the-scenes of your ${niche}.`,
      `Teach 3 tips about ${niche}.`
    ]
  });
});

app.post("/api/ai/bio", (req, res) => {
  const { name = "Creator", vibe = "cool" } = req.body || {};
  res.json({
    bio: `${name} • ${vibe} • Powered by BROKEN LORD CMD`
  });
});

app.post("/api/ai/title", (req, res) => {
  const { topic = "" } = req.body || {};
  res.json({
    title: topic ? `You won't believe this about ${topic}` : "Untitled by BROKEN LORD CMD"
  });
});

app.post("/api/ai/keywords", (req, res) => {
  const { text = "" } = req.body || {};
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const unique = [...new Set(words)].slice(0, 10);
  res.json({ keywords: unique });
});

// Simple stubs for the rest (they still “work”)
const stubEndpoints = [
  "/api/image/edit",
  "/api/image/generate",
  "/api/image/upscale",
  "/api/image/cartoon",
  "/api/image/bg-remove",
  "/api/image/blur-bg",
  "/api/image/grayscale",
  "/api/image/thumbnail",
  "/api/image/meme",
  "/api/image/watermark",
  "/api/video/generate",
  "/api/video/caption",
  "/api/video/thumbnail",
  "/api/video/trim",
  "/api/video/info",
  "/api/ai/chat",
  "/api/search/web",
  "/api/search/image",
  "/api/search/news",
  "/api/search/wiki",
  "/api/search/music",
  "/api/tools/qr",
  "/api/tools/shortlink",
  "/api/social/yt-metadata",
  "/api/social/ig-metadata",
  "/api/social/tiktok-metadata"
];

stubEndpoints.forEach((path) => {
  app.all(path, (req, res) => {
    res.json({
      status: "ok",
      endpoint: path,
      message:
        "Stub endpoint is working. You can now plug real logic (AI, external API, etc.).",
      received: {
        query: req.query,
        body: req.body
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`BROKEN LORD API HUB running on port ${PORT}`);
});
