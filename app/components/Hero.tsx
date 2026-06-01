"use client";
import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const cmd = "curl -fsSL https://raw.githubusercontent.com/Zerone-Laboratories/RIGEL/main/install-rigel-engine.sh | sudo -E bash";

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section" id="hero">
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 800,
          padding: "0 1.5rem",
        }}
      >
        <div className="logo-container animate-fade-in">
          <div className="logo-ring" />
          <div className="logo-ring-inner" />
          <svg viewBox="0 0 317 259" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#7a7777" strokeWidth="0.8" strokeLinecap="round">
              <path d="M69.3118 154.293C97.3584 66.7877 127.088 37.0583 158.5 65.1049C189.912 93.1515 219.642 122.881 247.688 154.293C219.642 185.705 189.912 215.435 158.5 243.481C127.088 215.435 97.3584 185.705 69.3118 154.293Z" />
              <path d="M94.5538 154.293C137.185 78.0062 179.815 78.0062 222.446 154.293C179.815 230.58 137.185 230.58 94.5538 154.293Z" />
              <path d="M52.4839 107.175C123.161 39.863 193.839 39.863 264.516 107.175C193.839 230.58 123.161 230.58 52.4839 107.175Z" />
              <path d="M77.7258 73.5189C131.575 17.4257 185.425 17.4257 239.274 73.5189C185.425 237.311 131.575 237.311 77.7258 73.5189Z" />
              <path d="M111.382 23.0349C142.794 -5.01165 174.206 -5.01165 205.618 23.0349C174.206 226.092 142.794 226.092 111.382 23.0349Z" />
              <path d="M94.5538 191.314C137.185 213.752 179.815 213.752 222.446 191.314C179.815 62.3001 137.185 62.3001 94.5538 191.314Z" />
              <path d="M52.4839 199.729C123.161 250.212 193.839 250.212 264.516 199.729C193.839 88.664 123.161 88.664 52.4839 199.729Z" />
              <path d="M35.6559 154.293C117.552 268.723 199.448 268.723 281.344 154.293C199.448 39.8629 117.552 39.8629 35.6559 154.293Z" />
              <path d="M18.8279 154.293C111.943 279.942 205.057 279.942 298.172 154.293C205.057 28.6442 111.943 28.6442 18.8279 154.293Z" />
              <path d="M2 154.293C106.333 291.16 210.667 291.16 315 154.293C210.667 17.4257 106.333 17.4257 2 154.293Z" />
            </g>
          </svg>
        </div>

        <h1 className="hero-title animate-fade-in-up" style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}>
          RIGEL
        </h1>

        <p className="hero-subtitle animate-fade-in-up" style={{ margin: "1.5rem auto 2.5rem", opacity: 0, animationDelay: "0.4s", animationFillMode: "forwards" }}>
          Open-source multi-agentic AI engine &amp; virtual assistant<br />
          framework/toolkit/sdk.
          <br />
          Multi-LLM backends · MCP tools · D-Bus integration · Voice interface
        </p>

        <div
          className="hero-install-cmd animate-fade-in-up"
          onClick={handleCopy}
          title="Click to copy"
          style={{ opacity: 0, animationDelay: "0.6s", animationFillMode: "forwards", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: "6px", padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: "16px", maxWidth: "100%" }}
        >
          <span className="prompt" style={{ color: "var(--accent)", flexShrink: 0 }}>$ </span>
          <span className="hero-cmd-text" style={{ flex: 1, textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-primary)" }}>{cmd}</span>
          <span className="copy-icon" style={{ cursor: "pointer", color: "var(--text-secondary)" }}>
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
