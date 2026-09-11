import { ArrowRight, Check, Download, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-intro"><div className="content-wrap narrow"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{copy}</p></div></section>;
}

export function FeatureBlock({ icon: Icon, number, title, copy, items }: { icon: LucideIcon; number: string; title: string; copy: string; items: string[] }) {
  return <article className="feature-block"><div className="feature-index"><span>{number}</span><Icon /></div><div><h2>{title}</h2><p>{copy}</p><ul>{items.map((item) => <li key={item}><Check />{item}</li>)}</ul></div></article>;
}

export function DownloadCallout() {
  return <section className="download-callout"><div><p className="eyebrow">Desktop utility</p><h2>Keep the media you’re allowed to keep.</h2><p>Free downloads for Windows, macOS, and Linux.</p></div><Button asChild size="lg" className="pill-button"><Link to="/download"><Download /> Download Harp</Link></Button></section>;
}

export function TextLink({ to, children }: { to: "/features" | "/supported-sites" | "/download" | "/docs"; children: React.ReactNode }) {
  return <Link to={to} className="text-link">{children}<ArrowRight /></Link>;
}
