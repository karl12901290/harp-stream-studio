import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, Film, Gauge, ListVideo, Radio, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/harp/site-chrome";
import { ProductPreview } from "@/components/harp/product-preview";
import { DownloadCallout, TextLink } from "@/components/harp/page-blocks";
import { sources } from "@/lib/harp-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Harp — Desktop Video Downloader" },
    { name: "description", content: "Download video, audio, series, and local streams with Harp for Windows, macOS, and Linux." },
    { property: "og:title", content: "Harp — Desktop Video Downloader" },
    { property: "og:description", content: "A focused desktop downloader for video, audio, series, and streams." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

function HomePage() {
  return <PageShell>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">Desktop downloader · Windows · macOS · Linux</p><h1>Harp</h1><p className="hero-statement">Bring media down to earth.</p><p className="hero-detail">A precise desktop tool for downloading video, audio, full series, and local streams—without handing your workflow to a browser tab.</p><div className="hero-actions"><Button asChild size="lg" className="pill-button"><Link to="/download"><Download /> Download free</Link></Button><Button asChild variant="ghost" size="lg"><Link to="/features">See how it works <ArrowRight /></Link></Button></div><p className="quiet-note"><ShieldCheck /> No sign-up required</p></div><div className="hero-product"><ProductPreview /></div></section>
    <section className="source-ribbon" aria-label="Supported sources">{sources.slice(0, 8).map((s) => <span key={s.name}>{s.name}</span>)}</section>
    <section className="section-band"><div className="content-wrap"><div className="section-heading"><div><p className="eyebrow">One place to download</p><h2>Paste a link. Choose the output. Keep moving.</h2></div><TextLink to="/features">Explore every feature</TextLink></div><div className="capability-grid">
      <article><Film /><span className="spec-number">01</span><h3>Quality without guesswork</h3><p>See the available formats, resolution, frame rate, and expected size before the download begins.</p></article>
      <article><ListVideo /><span className="spec-number">02</span><h3>Episodes, properly organized</h3><p>Pick individual episodes or a whole run with TMDB titles and metadata attached.</p></article>
      <article><Radio /><span className="spec-number">03</span><h3>Streams on your network</h3><p>Handle direct LAN and localhost streams alongside public links in the same focused workflow.</p></article>
    </div></div></section>
    <section className="workflow"><div className="content-wrap workflow-grid"><div><p className="eyebrow">Built for the handoff</p><h2>Inspect before you commit.</h2><p className="lead-small">Harp resolves the source first, then gives you the details that matter. No mystery filenames. No blind quality presets.</p><ul className="check-list"><li><Check /> Choose video or audio</li><li><Check /> Compare available quality</li><li><Check /> See output size and format</li><li><Check /> Follow progress in one place</li></ul></div><div className="inspect-panel"><div className="inspect-top"><span>OUTPUT INSPECTOR</span><Gauge /></div><div className="inspect-value"><strong>1080</strong><span>p</span></div><dl><div><dt>Container</dt><dd>MP4</dd></div><div><dt>Frame rate</dt><dd>60 fps</dd></div><div><dt>Video</dt><dd>H.264</dd></div><div><dt>Audio</dt><dd>AAC · 192 kbps</dd></div></dl></div></div></section>
    <section className="trust-band"><div className="content-wrap"><ShieldCheck /><div><h2>Your download stays on your machine.</h2><p>Harp runs as a desktop application and writes to the output folder you choose. Use it only for media you own or have permission to save.</p></div></div></section>
    <DownloadCallout />
  </PageShell>;
}
