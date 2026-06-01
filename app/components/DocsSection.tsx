"use client";
import { useState } from "react";

type TabKey = "web" | "dbus" | "mcp" | "voice";

const tabs: { key: TabKey; label: string }[] = [
  { key: "web", label: "Web API" },
  { key: "dbus", label: "D-Bus" },
  { key: "mcp", label: "MCP Tools" },
  { key: "voice", label: "Voice" },
];

interface Endpoint {
  method: string;
  path: string;
  desc: string;
  auth?: boolean;
}

const endpoints: Record<TabKey, Endpoint[]> = {
  web: [
    { method: "GET", path: "/", desc: "Service information and available endpoints", auth: false },
    { method: "POST", path: "/query", desc: "Basic inference with optional custom system prompt", auth: true },
    { method: "POST", path: "/query-with-memory", desc: "Inference with vector session retrieval for persistent context", auth: true },
    { method: "POST", path: "/query-think", desc: "Advanced multi-step reasoning capabilities", auth: true },
    { method: "POST", path: "/query-with-tools", desc: "Inference with MCP tool execution support", auth: true },
    { method: "POST", path: "/rigel-natural-language", desc: "Memory-first natural language tool routing", auth: true },
    { method: "POST", path: "/analyze-image", desc: "Vision-based image analysis via supported models", auth: true },
    { method: "POST", path: "/synthesize-text", desc: "Convert text to speech (chunk or linear mode)", auth: true },
    { method: "GET", path: "/list-voices", desc: "List available Piper TTS voice models", auth: true },
    { method: "POST", path: "/set-voice", desc: "Switch active TTS voice model at runtime", auth: true },
    { method: "POST", path: "/clone-voice", desc: "Start voice cloning pipeline from MP3 sample", auth: true },
    { method: "POST", path: "/recognize-audio", desc: "Transcribe uploaded audio file to text", auth: true },
    { method: "WS", path: "/live-voice-recognition", desc: "Real-time WebSocket audio streaming and transcription", auth: true },
    { method: "GET", path: "/license-info", desc: "License and copyright information", auth: false },
    { method: "POST", path: "/admin/create-key", desc: "Create new API key for a tenant", auth: true },
    { method: "GET", path: "/admin/usage/{id}", desc: "Get usage statistics for a tenant", auth: true },
  ],
  dbus: [
    { method: "CALL", path: "Query(query)", desc: "Basic inference with configured backend" },
    { method: "CALL", path: "QueryWithMemory(query, thread_id)", desc: "Inference with persistent conversation memory" },
    { method: "CALL", path: "QueryThink(query)", desc: "Advanced thinking and reasoning operations" },
    { method: "CALL", path: "QueryWithTools(query)", desc: "Inference with full MCP tools support" },
    { method: "CALL", path: "SynthesizeText(text, mode, voice)", desc: "Text-to-speech with mode and voice selection" },
    { method: "CALL", path: "ListVoices()", desc: "Returns JSON of available voices and current voice" },
    { method: "CALL", path: "SetVoice(voice_name)", desc: "Switch active voice synthesis model" },
    { method: "CALL", path: "CloneVoice(mp3_path, name, lang)", desc: "Start async voice cloning pipeline" },
    { method: "CALL", path: "RecognizeAudio(path, model)", desc: "Transcribe audio file using Whisper" },
    { method: "SIGNAL", path: "TranscriptionUpdate(text)", desc: "Real-time live transcription signal" },
    { method: "CALL", path: "LiveVoiceRecognition(action, cfg)", desc: "Start/stop/status of live whisper.cpp capture" },
  ],
  mcp: [
    { method: "TOOL", path: "current_time()", desc: "Get current system date and time" },
    { method: "TOOL", path: "get_system_info()", desc: "CWD, user, home, shell, Python version" },
    { method: "TOOL", path: "run_system_command(cmd)", desc: "Execute shell commands with 30s timeout" },
    { method: "TOOL", path: "read_file(path)", desc: "Read contents of any accessible file" },
    { method: "TOOL", path: "write_file(path, content)", desc: "Write content to files (creates if needed)" },
    { method: "TOOL", path: "list_directory(path)", desc: "List directory with visual file/folder indicators" },
    { method: "TOOL", path: "send_dbus_notification(title, msg)", desc: "Send desktop notification via D-Bus" },
    { method: "TOOL", path: "set_volume(level) / get_volume()", desc: "Manage system audio volume" },
    { method: "TOOL", path: "open_app(name) / close_app(name)", desc: "Launch or close applications" },
    { method: "TOOL", path: "take_screenshot(path)", desc: "Capture screenshot and save to file" },
    { method: "TOOL", path: "browser_interactions(task)", desc: "Browser automation via MCP agent" },
    { method: "TOOL", path: "network_status()", desc: "Report current network connectivity" },
  ],
  voice: [
    { method: "TTS", path: "Chunk Mode", desc: "Process text in sentence chunks for streaming audio playback" },
    { method: "TTS", path: "Linear Mode", desc: "Process entire text as single unit for quick synthesis" },
    { method: "STT", path: "Whisper (Python)", desc: "Models: tiny, base, small, medium, large" },
    { method: "STT", path: "whisper.cpp (Live)", desc: "Real-time capture via whisper-stream binary with ggml models" },
    { method: "CLONE", path: "Voice Cloning Pipeline", desc: "MP3 → WAV segmentation → Whisper transcription → Piper dataset" },
    { method: "MODEL", path: "knight.onnx", desc: "Default Piper TTS voice model" },
    { method: "MODEL", path: "hal.onnx", desc: "Alternative Piper TTS voice model" },
    { method: "MODEL", path: "jarvis-medium.onnx", desc: "Alternative Piper TTS voice model" },
  ],
};

function methodClass(m: string) {
  if (m === "GET") return "method-badge method-get";
  if (m === "POST") return "method-badge method-post";
  if (m === "WS" || m === "SIGNAL") return "method-badge method-ws";
  return "method-badge method-post";
}

const codeExamples: Record<TabKey, string> = {
  web: `# Basic query
curl -X POST "http://localhost:8000/query" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: rigel_your_key" \\
     -d '{"query": "Hello RIGEL!"}'

# Query with memory
curl -X POST "http://localhost:8000/query-with-memory" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: rigel_your_key" \\
     -d '{"query": "My name is Alice", "id": "user123"}'

# Query with tools
curl -X POST "http://localhost:8000/query-with-tools" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: rigel_your_key" \\
     -d '{"query": "List files and check the time"}'`,
  dbus: `from pydbus import SessionBus

bus = SessionBus()
service = bus.get("com.rigel.RigelService")

# Basic query
response = service.Query("Hello RIGEL!")

# Query with memory
response = service.QueryWithMemory("My name is Alice", "user123")
follow_up = service.QueryWithMemory("What's my name?", "user123")

# Query with MCP tools
response = service.QueryWithTools("Check system uptime")`,
  mcp: `# Start the MCP server (separate terminal)
python core/mcp/rigel_tools_server.py

# Server runs on port 8001 (SSE transport)
# Configure in server.py:
default_mcp = MultiServerMCPClient({
    "rigel tools": {
        "url": "http://localhost:8001/sse",
        "transport": "sse",
    },
})`,
  voice: `from core.synth_n_recog import Synthesizer, Recognizer

# Text-to-Speech
synth = Synthesizer(mode="chunk", voice="knight")
synth.synthesize("Hello, this is RIGEL speaking!")

# Switch voice at runtime
synth.set_voice("hal")

# Speech-to-Text
recognizer = Recognizer(model="tiny")
text = recognizer.transcribe("/path/to/audio.wav")`,
};

export default function DocsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("web");

  return (
    <section className="section section-dark" id="docs">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-label">Reference</p>
          <h2 className="section-title">Documentation</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            RIGEL exposes its capabilities through multiple interfaces — choose the one that fits your workflow.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`docs-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "dbus" && (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", gap: 20, fontSize: "0.78rem", color: "var(--text-secondary)", flexWrap: "wrap", justifyContent: "center" }}>
              <span>Service: <code style={{ color: "var(--accent-light)", fontFamily: "var(--font-mono)" }}>com.rigel.RigelService</code></span>
              <span>Path: <code style={{ color: "var(--accent-light)", fontFamily: "var(--font-mono)" }}>/com/rigel/RigelService</code></span>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 600, overflowY: "auto", paddingRight: 8 }}>
            {endpoints[activeTab].map((ep, i) => (
              <div key={i} className="docs-endpoint">
                <span className={methodClass(ep.method)}>{ep.method}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: 4 }}>
                    {ep.path}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {ep.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10, fontWeight: 600 }}>
              Example Usage
            </div>
            <div className="code-block">
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {codeExamples[activeTab]}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #docs > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
