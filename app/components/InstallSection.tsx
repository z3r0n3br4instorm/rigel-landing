"use client";
import { useState } from "react";

export default function InstallSection() {
  const [copied, setCopied] = useState(false);
  const cmd = "curl -fsSL https://raw.githubusercontent.com/Zerone-Laboratories/RIGEL/main/install-rigel-engine.sh | sudo -E bash";

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" id="install">
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <p className="section-label">Get Started</p>
        <h2 className="section-title">Install on Linux</h2>
        <p className="section-subtitle" style={{ margin: "0 auto 3rem" }}>
          One command. Clones the repo, sets up Python venv, installs dependencies, configures D-Bus, and pulls the default Ollama model.
        </p>

        <div className="install-terminal" style={{ textAlign: "left", margin: "0 auto" }}>
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">bash</span>
          </div>
          <div className="terminal-body" style={{ lineHeight: 2.2 }}>
            <div className="terminal-line" style={{ cursor: "pointer" }} onClick={handleCopy} title="Click to copy">
              <span className="terminal-prompt">$</span>
              <span className="terminal-command" style={{ flex: 1 }}>{cmd}</span>
              <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                )}
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "2rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          <span>Requires Python 3.8+</span>
          <span>·</span>
          <span>Docker alternative available</span>
          <span>·</span>
          <a href="https://github.com/Zerone-Laboratories/RIGEL" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Manual setup →</a>
        </div>
      </div>
    </section>
  );
}
