const statuses = [
  { feature: "Inference with Ollama", done: true },
  { feature: "Inference with Groq", done: true },
  { feature: "Inference with LLAMA.cpp", done: false },
  { feature: "Inference with Transformers", done: false },
  { feature: "Thinking / Reasoning", done: true },
  { feature: "MCP Tool Ecosystem", done: true },
  { feature: "D-Bus Server", done: true },
  { feature: "RAG (ChromaDB)", done: true },
  { feature: "Conversation Memory", done: true },
  { feature: "Local Voice Recognition", done: true },
  { feature: "Live Voice (whisper.cpp)", done: true },
  { feature: "Local Voice Synthesis", done: true },
  { feature: "Visual Inference", done: true },
  { feature: "Natural Language Routing", done: true },
  { feature: "Image Analysis Endpoint", done: true },
  { feature: "Browser Automation", done: true },
];

export default function StatusSection() {
  return (
    <section className="section" id="status">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-label">Roadmap</p>
          <h2 className="section-title">Project Status</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Current feature completion status for RIGEL Engine v5.0.0.
          </p>
        </div>

        <div className="status-grid">
          {statuses.map((s, i) => (
            <div key={i} className="status-item">
              <span style={{ color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 500 }}>
                {s.feature}
              </span>
              {s.done ? (
                <span className="status-check">✓</span>
              ) : (
                <span className="status-pending">X</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
