import { Link } from "@tanstack/react-router";
import { Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { to: "/features", label: "Features" },
  { to: "/supported-sites", label: "Supported sites" },
  { to: "/docs", label: "Docs" },
] as const;

export function HarpMark() {
  return (
    <Link to="/" className="brand" aria-label="Harp home">
      <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
      <span>Harp</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <HarpMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((item) => (
            <Link key={item.to} to={item.to} activeProps={{ className: "active" }}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button asChild size="sm" className="pill-button">
            <Link to="/download"><Download /> Download</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label="Open navigation"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="glass-sheet">
              <SheetTitle>Navigate Harp</SheetTitle>
              <SheetDescription>Product information and downloads.</SheetDescription>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {[{ to: "/", label: "Home" }, ...links, { to: "/download", label: "Download" }].map((item) => (
                  <Link key={item.to} to={item.to}>{item.label}</Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div><HarpMark /><p>A focused desktop tool for saving video and streams.</p></div>
        <div><strong>Product</strong><Link to="/features">Features</Link><Link to="/supported-sites">Supported sites</Link><Link to="/download">Download</Link></div>
        <div><strong>Resources</strong><Link to="/docs">Documentation</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
      <div className="footer-base"><span>© 2026 Harp</span><span>Use Harp only for media you have permission to download.</span></div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
}
