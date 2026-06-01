export const docsContent = [
  // Getting Started
  {
    id: "overview",
    title: "Overview",
    html: `
      <p>RIGEL is a powerful open-source multi-agentic AI engine and virtual assistant framework that provides a unified interface for multiple language model backends. Built with extensibility in mind, it supports both local AI inference via Ollama and cloud-based inference through Groq.</p>
      <p>Perfect for developers building AI applications, chatbots, virtual assistants, and agentic AI systems.</p>
      <ul>
        <li><strong>Multi-LLM Support</strong>: Ollama (local), Groq (cloud), LLAMA.cpp, Transformers</li>
        <li><strong>Agentic AI</strong>: Advanced reasoning, thinking, and decision-making</li>
        <li><strong>System Integration</strong>: D-Bus server for OS-level AI assistance</li>
        <li><strong>MCP Tools</strong>: File management, system commands, real-time information, and rich system/device interaction with configurable server support</li>
        <li><strong>Voice Interface</strong>: Local speech-to-text and text-to-speech capabilities</li>
        <li><strong>Vector Memory Retrieval</strong>: <code>/query-with-memory</code> uses vector session retrieval to bring in relevant historical context.</li>
        <li><strong>Image Analysis</strong>: Vision-powered image understanding via <code>/analyze-image</code></li>
        <li><strong>RAG Support</strong>: Retrieval-Augmented Generation using ChromaDB for document-based AI interactions</li>
      </ul>
      <div class="warning">
        RIGEL Engine is still in developer-beta stage. Bugs may present. The code will be well structured in the public release and more features will be added!
      </div>
    `
  },
  {
    id: "installation",
    title: "Installation",
    html: `
      <p>To run RIGEL natively on Linux without Docker, follow these steps:</p>
      <ol>
        <li><strong>Clone the repository:</strong>
          <pre><code>git clone https://github.com/Zerone-Laboratories/RIGEL
cd RIGEL</code></pre>
        </li>
        <li><strong>For D-Bus integration, install the system D-Bus configuration:</strong>
          <pre><code>sudo bash install_dbus_config.sh</code></pre>
        </li>
        <li><strong>Python virtual environment setup:</strong>
          <pre><code>python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt</code></pre>
        </li>
        <li><strong>For voice features, install system dependencies:</strong>
          <pre><code># Ubuntu/Debian
sudo apt-get install pulseaudio pulseaudio-utils libsdl2-2.0-0

# Fedora/RHEL
sudo dnf install pulseaudio pulseaudio-utils SDL2</code></pre>
        </li>
        <li><strong>Ollama Backend (Optional):</strong>
          <pre><code>curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2</code></pre>
        </li>
      </ol>
    `
  },
  {
    id: "quick-start",
    title: "Quick Start",
    html: `
      <p>RIGEL offers two server modes to suit different use cases and environments:</p>
      <h3>D-Bus Server (Linux Desktop Integration)</h3>
      <p>RIGEL's D-Bus server provides system-wide AI assistance with advanced tool capabilities, perfect for Linux desktop integration.</p>
      <pre><code># Using the main launcher (recommended)
python main.py
# Select option 1

# Or directly
python dbus_server.py</code></pre>
      
      <h3>Web Server (REST API)</h3>
      <p>RIGEL's web server provides a REST API interface accessible from any HTTP client.</p>
      <pre><code># Using the main launcher
python main.py
# Select option 2

# Or directly
python web_server.py</code></pre>
    `
  },
  {
    id: "docker",
    title: "Docker Deployment",
    html: `
      <p>RIGEL can be easily deployed using Docker, providing a consistent environment across different systems without worrying about dependencies. This is the recommended deployment method for most users.</p>
      <pre><code># Start with default GROQ backend and D-Bus server
docker-compose up

# Start with OLLAMA backend and web server
INFERENCE_ENGINE=ollama docker-compose up

# Start with custom environment variables
INFERENCE_ENGINE=groq GROQ_API_KEY=your_key_here docker-compose up

# Start both Web + D-Bus servers together
SERVER_TYPE=hybrid docker-compose up</code></pre>
      <div class="note">
        Note: With INFERENCE_ENGINE=ollama, the container prefers a system Ollama if available. Mount your host binary (e.g. /usr/bin/ollama:/usr/bin/ollama:ro) or set OLLAMA_HOST to a reachable host.
      </div>
    `
  },

  // Web API
  {
    id: "web-endpoints",
    title: "Web API Endpoints",
    html: `
      <p>RIGEL's web server provides a modern REST API interface with automatic OpenAPI documentation. Once started, documentation is available at <code>http://localhost:8000/docs</code>.</p>
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/query</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Basic inference</td>
          </tr>
          <tr>
            <td><code>/query-with-memory</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Inference with conversation memory using vector retrieval</td>
          </tr>
          <tr>
            <td><code>/query-think</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Advanced thinking capabilities</td>
          </tr>
          <tr>
            <td><code>/query-with-tools</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Inference with MCP tools support</td>
          </tr>
          <tr>
            <td><code>/rigel-natural-language</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Memory-first natural language tool routing</td>
          </tr>
          <tr>
            <td><code>/analyze-image</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Vision-based image analysis</td>
          </tr>
          <tr>
            <td><code>/synthesize-text</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Convert text to speech</td>
          </tr>
          <tr>
            <td><code>/recognize-audio</code></td>
            <td><span class="method-badge method-post">POST</span></td>
            <td>Transcribe audio file to text</td>
          </tr>
          <tr>
            <td><code>/live-voice-recognition</code></td>
            <td><span class="method-badge method-ws">WS</span></td>
            <td>Live voice recognition audio stream via WebSocket</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: "web-auth",
    title: "Web Authentication",
    html: `
      <p>All endpoints except <code>/</code> and <code>/license-info</code> require authentication via the <code>X-API-Key</code> header.</p>
      <pre><code># Example authenticating via curl
curl -X POST "http://localhost:8000/query" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: rigel_your_api_key_here" \\
     -d '{"query": "Hello RIGEL!"}'</code></pre>
    `
  },
  {
    id: "web-examples",
    title: "Web API Usage Examples",
    html: `
      <pre><code># Query with memory
curl -X POST "http://localhost:8000/query-with-memory" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: rigel_your_api_key_here" \\
     -d '{"query": "My name is Alice", "id": "user123"}'

# Query with tools
curl -X POST "http://localhost:8000/query-with-tools" \\
     -H "Content-Type: application/json" \\
     -H "X-API-Key: rigel_your_api_key_here" \\
     -d '{"query": "What time is it and list files in current directory?"}'

# Audio recognition
curl -X POST "http://localhost:8000/recognize-audio" \\
     -H "X-API-Key: rigel_your_api_key_here" \\
     -F "audio_file=@audio.wav" \\
     -F "model=tiny"</code></pre>
    `
  },

  // D-Bus
  {
    id: "dbus-overview",
    title: "D-Bus Interface Overview",
    html: `
      <p>RIGEL's D-Bus server provides system-wide AI assistance with advanced tool capabilities, perfect for Linux desktop integration.</p>
      <ul>
        <li><strong>Service Name</strong>: <code>com.rigel.RigelService</code></li>
        <li><strong>Interface</strong>: <code>com.rigel.RigelService</code></li>
        <li><strong>Object Path</strong>: <code>/com/rigel/RigelService</code></li>
      </ul>
      <p>Best for Linux desktop environments, system-wide AI assistance, and inter-process communication.</p>
    `
  },
  {
    id: "dbus-endpoints",
    title: "D-Bus Endpoints",
    html: `
      <h4><code>Query(query: str) -> str</code></h4>
      <p>Performs basic inference with the configured backend.</p>

      <h4><code>QueryWithMemory(query: str, thread_id: str) -> str</code></h4>
      <p>Performs inference with persistent conversation memory. Use thread_id for multi-turn conversations.</p>

      <h4><code>QueryThink(query: str) -> str</code></h4>
      <p>Performs advanced thinking/reasoning operations for complex problem solving.</p>

      <h4><code>QueryWithTools(query: str) -> str</code></h4>
      <p>Performs inference with full MCP (Model Context Protocol) tools support.</p>
    `
  },
  {
    id: "dbus-examples",
    title: "D-Bus Client Examples",
    html: `
      <pre><code>from pydbus import SessionBus

bus = SessionBus()
service = bus.get("com.rigel.RigelService")

# Basic query
response = service.Query("Hello RIGEL!")
print(response)

# Query with memory (remembers conversation context)
response = service.QueryWithMemory("My name is Alice", "user123")
follow_up = service.QueryWithMemory("What's my name?", "user123")

# Query with MCP tools
response = service.QueryWithTools("What time is it and list the files in the current directory?")</code></pre>
    `
  },
  {
    id: "dbus-signals",
    title: "D-Bus Signals",
    html: `
      <p>RIGEL uses D-Bus signals for real-time streaming features, most notably for live voice recognition.</p>
      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>Argument</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>TranscriptionUpdate</code></td>
            <td><code>s</code> text</td>
            <td>A transcribed line from live capture (whisper.cpp)</td>
          </tr>
        </tbody>
      </table>
    `
  },

  // MCP Tools
  {
    id: "mcp-overview",
    title: "MCP Tools Overview",
    html: `
      <p>RIGEL includes comprehensive MCP (Model Context Protocol) support that significantly extends the AI's capabilities with real-world system operations. The MCP server provides a secure bridge between the AI and your system.</p>
      <ul>
        <li><strong>System Operations</strong>: Real-time info, command execution, process management</li>
        <li><strong>File Management</strong>: Read/write, directory navigation, content analysis</li>
        <li><strong>UI & Desktop Control</strong>: Volume, brightness, windows, clipboard</li>
        <li><strong>Browser Interaction</strong>: Full browser automation via MCP agent</li>
      </ul>
    `
  },
  {
    id: "mcp-config",
    title: "MCP Configuration",
    html: `
      <p>RIGEL supports two MCP transport methods: <strong>SSE</strong> (for HTTP-based servers) and <strong>STDIO</strong> (for process-based servers). You can configure custom MCP servers in <code>server.py</code>.</p>
      <pre><code># Example MCP server configuration in server.py
default_mcp = MultiServerMCPClient(
    {
        "rigel tools": {
            "url": "http://localhost:8001/sse",
            "transport": "sse",
        },
        "python-toolbox": {
            "command": "/path/to/venv/bin/python",
            "args": ["-m", "mcp_server_package"],
            "transport": "stdio"
        }
    }
)</code></pre>
    `
  },
  {
    id: "mcp-tools",
    title: "Available Built-in MCP Tools",
    html: `
      <p>The built-in RIGEL MCP server (<code>core/mcp/rigel_tools_server.py</code>) provides tools natively optimized for Linux and KDE Plasma.</p>
      <h4>System & File Operations</h4>
      <ul>
        <li><code>current_time()</code>, <code>get_system_info()</code>, <code>run_system_command(command)</code></li>
        <li><code>read_file(file_path)</code>, <code>write_file(file_path, content)</code>, <code>list_directory(path)</code></li>
      </ul>
      <h4>Desktop Control</h4>
      <ul>
        <li><code>set_volume(level)</code>, <code>set_brightness(level)</code>, <code>toggle_night_color()</code></li>
        <li><code>list_running_apps()</code>, <code>open_app(name)</code>, <code>close_window_by_title(title)</code></li>
        <li><code>get_clipboard_content()</code>, <code>take_screenshot(output_path)</code></li>
      </ul>
      <h4>ACI Device Integration</h4>
      <p>Communicate with Android devices via KDE Connect (ACI = Auxiliary Compute Interface).</p>
      <ul>
        <li><code>ztos_aci_send_sms(number, message)</code></li>
        <li><code>ztos_aci_ring_device(device_id)</code></li>
        <li><code>ztos_aci_send_file(device_id, file_path)</code></li>
      </ul>
    `
  },
  {
    id: "mcp-examples",
    title: "MCP Usage Examples",
    html: `
      <p>Using the D-Bus service, simply pass natural language requests to <code>QueryWithTools()</code>:</p>
      <pre><code># System administration with tools
service.QueryWithTools("Check system health: CPU, memory, disk usage")
service.QueryWithTools("List all Python projects in my home directory")
service.QueryWithTools("Create a backup script for my important files")
service.QueryWithTools("Read the README.md file and give me a brief summary")</code></pre>
    `
  },

  // Voice
  {
    id: "voice-tts",
    title: "Text-to-Speech (TTS)",
    html: `
      <p>RIGEL uses <strong>Piper TTS</strong> for high-quality, local voice synthesis with multiple modes.</p>
      <ul>
        <li><strong>Chunk Mode</strong>: Processes text in chunks (sentences) for streaming audio playback</li>
        <li><strong>Linear Mode</strong>: Processes entire text as a single unit</li>
      </ul>
      <pre><code>from pydbus import SessionBus
bus = SessionBus()
service = bus.get("com.rigel.RigelService")

# Chunk mode for streaming
result = service.SynthesizeText("Hello, this is RIGEL speaking.", "chunk", "knight")</code></pre>
    `
  },
  {
    id: "voice-stt",
    title: "Speech-to-Text (STT)",
    html: `
      <p>RIGEL uses <strong>OpenAI Whisper</strong> for accurate, local speech recognition.</p>
      <p>Available models: <code>tiny</code>, <code>base</code>, <code>small</code>, <code>medium</code>, <code>large</code>.</p>
      <pre><code>from pydbus import SessionBus
service = SessionBus().get("com.rigel.RigelService")

# Transcribe audio file
transcription = service.RecognizeAudio("/path/to/audio.wav", "tiny")
print(f"Transcription: {transcription}")</code></pre>
    `
  },
  {
    id: "voice-live",
    title: "Live Voice Recognition",
    html: `
      <p>Powered by <strong>whisper.cpp</strong> for real-time streaming audio capture and transcription.</p>
      <p>Live transcription streams results via DBus signals. Call <code>LiveVoiceRecognition("start")</code> to begin capture, then subscribe to <code>TranscriptionUpdate</code> signals.</p>
      <pre><code>def on_transcription(text):
    print(f"[LIVE] {text}")

service.TranscriptionUpdate.connect(on_transcription)
result = service.LiveVoiceRecognition("start", '{"model": "tiny.en"}')</code></pre>
    `
  },
  {
    id: "voice-cloning",
    title: "Voice Cloning",
    html: `
      <p>RIGEL includes an automated voice cloning pipeline that converts MP3 voice clips into a Piper-compatible training dataset.</p>
      <ol>
        <li>Converts MP3 to WAV segments</li>
        <li>Transcribes each segment with Whisper</li>
        <li>Generates a Piper-compatible <code>metadata.csv</code> file</li>
      </ol>
      <pre><code># D-Bus Example
service.CloneVoice("/path/to/voice_sample.mp3", "myvoice", "English (U.S.)")</code></pre>
      <div class="note">
        Voice cloning runs asynchronously. Full model training requires the Piper training environment with GPU support via the included Jupyter notebook.
      </div>
    `
  },
  {
    id: "voice-models",
    title: "Voice Models",
    html: `
      <p>Voice models are stored locally. Use the API or DBus to list and set active voices.</p>
      <ul>
        <li><strong>Piper TTS (.onnx)</strong>: Stored in <code>core/synthesis_assets/</code>. Default is <code>knight.onnx</code>.</li>
        <li><strong>Whisper (Python)</strong>: Downloaded automatically on first use.</li>
        <li><strong>Whisper.cpp (ggml)</strong>: Pre-bundled in <code>core/whisper_live/models/</code> (e.g. <code>tiny.en</code>).</li>
      </ul>
      <pre><code># Set default via Environment Variable
export VOICE=knight  # Options: knight, hal, jarvis-medium</code></pre>
    `
  },

  // Python SDK
  {
    id: "sdk-ollama",
    title: "Ollama Backend SDK",
    html: `
      <p>The <code>RigelOllama</code> class wraps local Ollama inference.</p>
      <pre><code>from core.rigel import RigelOllama

rigel = RigelOllama(model_name="llama3.2")
messages = [
    ("system", "You are RIGEL, a helpful assistant"),
    ("human", "Hello!"),
]
response = rigel.inference(messages=messages)
print(response.content)</code></pre>
    `
  },
  {
    id: "sdk-groq",
    title: "Groq Backend SDK",
    html: `
      <p>The <code>RigelGroq</code> class wraps high-speed cloud inference via Groq.</p>
      <pre><code>from core.rigel import RigelGroq
import os

os.environ["GROQ_API_KEY"] = "your-groq-api-key"
rigel = RigelGroq(model_name="llama3-70b-8192")
response = rigel.inference([("human", "What's the weather like?")])</code></pre>
    `
  },
  {
    id: "sdk-memory",
    title: "Inference with Memory",
    html: `
      <p>Memory tracks conversation context persistently using thread IDs.</p>
      <pre><code>rigel = RigelOllama()

# RIGEL remembers context via thread_id
r1 = rigel.inference_with_memory([("human", "My name is John.")], thread_id="t1")
r2 = rigel.inference_with_memory([("human", "What's my name?")], thread_id="t1")

history = rigel.get_conversation_history(thread_id="t1")
rigel.clear_memory(thread_id="t1")</code></pre>
    `
  },
  {
    id: "sdk-vision",
    title: "Visual Inference",
    html: `
      <p>Analyze images locally or from the web.</p>
      <p>Supported Models: <code>llava</code>, <code>bakllava</code> (Ollama), <code>llama-3.2-11b-vision-preview</code> (Groq).</p>
      <pre><code>rigel = RigelOllama(model_name="llava")
response = rigel.visual_inference(
    prompt="What's in this image?",
    image_source="/path/to/image.jpg"
)</code></pre>
    `
  },
  {
    id: "sdk-rag",
    title: "RAG Support",
    html: `
      <p>Retrieval-Augmented Generation using ChromaDB for document context.</p>
      <pre><code>from core.rdb import DBConn

db = DBConn()
db.load_data_from_pdf_path("path/to/document.pdf")
results = db.run_similar_serch("your search query")</code></pre>
    `
  },

  // Reference
  {
    id: "env-vars",
    title: "Environment Variables",
    html: `
      <p>RIGEL uses several environment variables for configuration:</p>
      <ul>
        <li><code>INFERENCE_ENGINE</code>: "ollama" or "groq"</li>
        <li><code>SERVER_TYPE</code>: "web", "dbus", or "hybrid" (Docker usage)</li>
        <li><code>GROQ_API_KEY</code>: Required for Groq cloud inference</li>
        <li><code>OLLAMA_HOST</code>: Custom endpoint for Ollama</li>
        <li><code>VOICE</code>: Default TTS voice model name</li>
      </ul>
    `
  },
  {
    id: "project-structure",
    title: "Project Structure",
    html: `
      <pre><code>RIGEL_SERVICE/
├── core/
│   ├── rigel.py          # Main RIGEL engine classes
│   ├── rdb.py            # RAG database functionality
│   ├── synth_n_recog.py  # Voice synthesis and recognition
│   ├── whisper_live/     # Real-time audio capture
│   ├── mcp/              # MCP Tools server implementation
│   └── synthesis_assets/ # Voice synthesis ONNX models
├── server.py             # D-Bus server implementation
├── web_server.py         # REST API server implementation
└── main.py               # Interactive main launcher</code></pre>
    `
  },
  {
    id: "browser-automation",
    title: "Browser Automation (Incomplete)",
    html: `
      <div class="note">
        This feature and its documentation are currently incomplete and under active development. Please check back later for updates.
      </div>
    `
  }
];
