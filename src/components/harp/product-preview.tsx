import { Check, ChevronDown, Download, Link2, Music2, Settings2 } from "lucide-react";

export function ProductPreview() {
  return (
    <div className="app-window" aria-label="Harp desktop app preview">
      <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>Harp</span><Settings2 /></div>
      <div className="app-layout">
        <aside className="app-sidebar">
          <div className="app-logo"><Music2 /><strong>Harp</strong></div>
          <nav><span className="selected"><Download /> Downloads</span><span><Link2 /> Sources</span></nav>
          <small>OUTPUT</small><p>~/Downloads/Harp</p>
        </aside>
        <div className="app-content">
          <div className="app-title"><div><h3>Download media</h3><p>Paste a link to inspect available formats.</p></div><span className="status-ready"><i /> Ready</span></div>
          <div className="url-field"><span>https://youtube.com/watch?v=...</span><button type="button" aria-label="Inspect pasted link"><Download /></button></div>
          <div className="media-row">
            <div className="media-thumb"><Music2 /></div>
            <div className="media-info"><strong>After Hours — Live Session</strong><span>YouTube · 12:48</span><div><em>1080p</em><em>MP4</em><em>60 fps</em></div></div>
            <Check className="complete-icon" />
          </div>
          <div className="format-row"><span>Format</span><button type="button">MP4 · 1080p <ChevronDown /></button><span>34.8 MB</span></div>
          <div className="progress-block"><div><span>Downloading video</span><b>72%</b></div><div className="progress-track"><i /></div><small>24.9 MB of 34.8 MB · 18 MB/s</small></div>
        </div>
      </div>
    </div>
  );
}
