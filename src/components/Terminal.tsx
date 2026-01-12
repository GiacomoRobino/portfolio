import { useRef, useEffect, KeyboardEvent } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import './Terminal.css';

function Terminal() {
  const {
    currentOutput,
    inputValue,
    availableCommands,
    executeCommand,
    handleInputChange
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputValue);
    }
  };

  const handleCommandClick = (command: string) => {
    executeCommand(command);
    inputRef.current?.focus();
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal" onClick={handleTerminalClick}>
      {/* Static CV Content */}
      <p className="terminal-line"><span className="prompt">$</span> whoami</p>
      <p className="terminal-output">Giacomo Robino - Software Engineer
      </p>

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

      <p className="terminal-line"><span className="prompt">$</span> cat studies.txt</p>
      <p className="terminal-output">
        2019 Bachelor in Computer Science - University of Turin
        <br />
        2014 Master in Law - University of Turin
      </p>

      {/* Separator */}
      <div className="terminal-separator"></div>

      {/* Command Input */}
      <div className="command-input-container">
        <div className="terminal-line input-line">
          <span className="prompt">$</span>
          <div className="input-wrapper">
            <span className="input-mirror">{inputValue}</span>
            <span className="cursor">_</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>

        <div className="command-suggestions">
          <span className="suggestions-label">Try: </span>
          {availableCommands.map((cmd, index) => (
            <span key={cmd}>
              <button
                className="command-suggestion"
                onClick={() => handleCommandClick(cmd)}
                type="button"
              >
                {cmd}
              </button>
              {index < availableCommands.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>

      {/* Command Output */}
      {currentOutput && (
        <div className="command-result">
          <p className="terminal-line">
            <span className="prompt">$</span> {currentOutput.command}
          </p>
          {currentOutput.content}
        </div>
      )}
    </div>
  );
}

export default Terminal;
