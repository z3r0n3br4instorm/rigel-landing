"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { docsNav } from "./docsNav";
import { docsContent } from "./docsContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function DocsPage() {
  const [activeId, setActiveId] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setActiveId(hash);
  }, []);

  const handleNav = (id: string) => {
    setActiveId(id);
    setMobileNavOpen(false);
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 64 }}>
      {/* Top nav bar */}
      <nav className="nav-container" style={{ position: "fixed", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--text-primary)" }}>
            <Image src={`${basePath}/zerone-logo.png`} alt="Zerone Laboratories" width={120} height={26} style={{ height: 26, width: 'auto' }} />
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.08em", marginLeft: 4 }}>Docs</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/" className="nav-link">Home</Link>
            <a href="https://github.com/Zerone-Laboratories/RIGEL" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile nav toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 200,
          width: 48, height: 48, borderRadius: "50%",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          color: "var(--text-primary)", cursor: "pointer",
          display: "none", alignItems: "center", justifyContent: "center",
        }}
        className="docs-mobile-toggle"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`docs-sidebar ${mobileNavOpen ? "open" : ""}`}
        style={{
          width: 260, flexShrink: 0, position: "fixed", top: 64, bottom: 0, left: 0,
          overflowY: "auto", padding: "1.5rem 0",
          borderRight: "1px solid var(--border)", background: "rgba(42, 37, 37, 0.95)",
          backdropFilter: "blur(12px)", zIndex: 50,
        }}
      >
        {docsNav.map((group) => (
          <div key={group.section} style={{ marginBottom: "1.25rem" }}>
            <div style={{ padding: "0 1.25rem", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>
              {group.section}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "6px 1.25rem 6px 1.5rem",
                  fontSize: "0.8rem", fontFamily: "'Literata', serif",
                  color: activeId === item.id ? "var(--text-primary)" : "var(--text-secondary)",
                  background: activeId === item.id ? "var(--accent-glow)" : "transparent",
                  border: "none", borderLeft: activeId === item.id ? "2px solid var(--accent)" : "2px solid transparent",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 260, padding: "2rem 3rem 6rem", maxWidth: 900 }}>
        {docsContent.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: "4rem", scrollMarginTop: 80 }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>
              {section.title}
            </h2>
            <div
              className="docs-prose"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          </section>
        ))}
      </main>

      <style>{`
        .docs-prose { font-size: 0.88rem; line-height: 1.85; color: var(--text-secondary); }
        .docs-prose h3 { font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin: 2rem 0 0.75rem; letter-spacing: 0.01em; }
        .docs-prose h4 { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin: 1.5rem 0 0.5rem; }
        .docs-prose p { margin-bottom: 1rem; }
        .docs-prose ul, .docs-prose ol { margin-bottom: 1rem; padding-left: 1.5rem; }
        .docs-prose li { margin-bottom: 0.4rem; }
        .docs-prose strong { color: var(--text-primary); font-weight: 600; }
        .docs-prose code { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.78rem; background: var(--code-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--code-border); color: var(--text-primary); }
        .docs-prose pre { background: var(--code-bg); border: 1px solid var(--code-border); border-radius: 8px; padding: 1.25rem 1.5rem; overflow-x: auto; margin: 1rem 0 1.5rem; }
        .docs-prose pre code { background: none; border: none; padding: 0; font-size: 0.76rem; line-height: 1.7; display: block; color: var(--text-primary); }
        .docs-prose table { width: 100%; border-collapse: collapse; margin: 1rem 0 1.5rem; font-size: 0.82rem; }
        .docs-prose th { text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--border); color: var(--text-primary); font-weight: 600; font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase; }
        .docs-prose td { padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: top; }
        .docs-prose tr:hover td { background: rgba(67, 61, 61, 0.15); }
        .docs-prose .note { padding: 1rem 1.25rem; background: rgba(67, 61, 61, 0.2); border-left: 3px solid var(--accent); border-radius: 0 6px 6px 0; margin: 1rem 0 1.5rem; font-size: 0.82rem; }
        .docs-prose .warning { padding: 1rem 1.25rem; background: rgba(200, 160, 80, 0.08); border-left: 3px solid #c8a050; border-radius: 0 6px 6px 0; margin: 1rem 0 1.5rem; font-size: 0.82rem; }
        .docs-prose .method-badge { display: inline-block; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 3px; font-family: var(--font-mono); vertical-align: middle; margin-right: 6px; }
        .docs-prose .method-get { background: var(--accent-glow); color: var(--text-primary); border: 1px solid var(--border); }
        .docs-prose .method-post { background: var(--accent-glow); color: var(--text-primary); border: 1px solid var(--border); }
        .docs-prose .method-ws { background: var(--accent-glow); color: var(--text-primary); border: 1px solid var(--border); }

        @media (max-width: 900px) {
          .docs-sidebar { display: none; }
          .docs-sidebar.open { display: block; position: fixed; left: 0; top: 64px; bottom: 0; width: 260px; z-index: 200; }
          .docs-mobile-toggle { display: flex !important; }
          main { margin-left: 0 !important; padding: 1.5rem 1.25rem 4rem !important; }
        }
      `}</style>
    </div>
  );
}
