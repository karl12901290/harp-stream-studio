import { Apple, Monitor, Terminal } from "lucide-react";

export const downloads = [
  { os: "Windows", detail: "Windows 10 or later · x64", format: ".exe installer", icon: Monitor },
  { os: "macOS", detail: "macOS 12 or later · Apple silicon / Intel", format: ".dmg", icon: Apple },
  { os: "Linux", detail: "64-bit · common distributions", format: "AppImage", icon: Terminal },
] as const;

export const sources = [
  { name: "YouTube", type: "Video, audio, playlists", note: "Quality and format selection" },
  { name: "Instagram", type: "Posts and reels", note: "Public links" },
  { name: "TikTok", type: "Video", note: "Public links" },
  { name: "X", type: "Video posts", note: "Public links" },
  { name: "Reddit", type: "Hosted video", note: "Audio merged when available" },
  { name: "Facebook", type: "Public video", note: "Availability varies by post" },
  { name: "Watchseries", type: "Series and episodes", note: "TMDB metadata and episode picker" },
  { name: "Coomer", type: "Posts and media", note: "Via the Kemono API" },
  { name: "Local streams", type: "LAN and localhost", note: "Direct stream handling" },
] as const;
