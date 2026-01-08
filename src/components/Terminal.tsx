import './Terminal.css';

function Terminal() {
  return (
    <div className="terminal">
      <p className="terminal-line"><span className="prompt">$</span> whoami</p>
      <p className="terminal-output">Giacomo Robino - Software Engineer</p>

      <p className="terminal-line"><span className="prompt">$</span> cat about.txt</p>
      <p className="terminal-output">
        Full Stack Developer with experience in IoT, banking, and cloud solutions.
        <br />
        Based in Ticino, Switzerland.
      </p>

      <p className="terminal-line"><span className="prompt">$</span> ls skills/</p>
      <p className="terminal-output">
        Backend: Python, Java, FastAPI, Quarkus, Kafka, MQTT
        <br />
        Frontend: React, Angular, TypeScript
        <br />
        Other: Docker, Git, LLMs
      </p>

      <p className="terminal-line"><span className="prompt">$</span> cat experience.txt | head -3</p>
      <p className="terminal-output">
        2023-2025 Paradox Engineering - Full Stack Cloud Developer
        <br />
        2021-2023 Cluster Reply - Frontend Developer (Angular)
        <br />
        2019-2021 Hanon System - Software Engineer (Python)
      </p>

      <p className="terminal-line"><span className="prompt">$</span> <span className="cursor">_</span></p>
    </div>
  );
}

export default Terminal;
