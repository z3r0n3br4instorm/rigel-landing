const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z"/><path d="M6 10h12v2a6 6 0 01-12 0v-2z"/><path d="M12 18v4M8 22h8"/></svg>
    ),
    title: "Multi-Backend LLM Support",
    desc: "Route inference to Ollama (local, private), Groq (cloud, high-throughput), or LLAMA.cpp (GPU/Vulkan — roadmap). Switch engines at runtime.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    ),
    title: "MCP Tool Ecosystem",
    desc: "Real-time tool use during inference: file I/O, shell execution, directory listing, desktop control, and OS-level functionalities via configurable MCP servers.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><path d="M12 19v4M8 23h8"/></svg>
    ),
    title: "Voice Interface (Local)",
    desc: "STT via OpenAI Whisper. TTS via Piper with chunk and linear streaming. Live recognition via whisper.cpp. Fully offline — no cloud API calls.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-9-9"/><path d="M21 3v6h-6"/><path d="M12 7v5l3 3"/></svg>
    ),
    title: "Agentic Reasoning & Memory",
    desc: "Thread-based conversation memory with inference_with_memory(). Dedicated think() for multi-step reasoning. Persistent session state via unique thread IDs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    ),
    title: "Dual Server Interface",
    desc: "D-Bus: OS-level IPC for Linux desktop integration. Web: FastAPI REST with OpenAPI docs, API-key auth, rate-limiting, and Docker support.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M8 7h8M8 11h6"/></svg>
    ),
    title: "RAG Support",
    desc: "Retrieval-Augmented Generation via ChromaDB. Ingest PDFs or text files and run similarity search to ground LLM responses in document context.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
    ),
    title: "Browser Automation",
    desc: "Record browser workflows once with AI, replay them infinitely without AI. Save as JSON, share across teams, run headless for automation.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
    ),
    title: "Voice Cloning",
    desc: "Automated pipeline: MP3 → WAV segmentation → Whisper transcription → Piper-compatible dataset. Train custom voice models with GPU support.",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Engineered for System-Level AI</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            RIGEL bridges the gap between powerful AI models and practical operating system
            integration — from inference to voice, from memory to automation.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
