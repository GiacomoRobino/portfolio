import { useState, useCallback } from 'react';
import { getCommand, getCommandNames } from '../data/commands';
import { CommandOutput } from '../types/terminal';

export const useTerminal = () => {
  const [currentOutput, setCurrentOutput] = useState<CommandOutput | null>(null);
  const [inputValue, setInputValue] = useState('');

  const executeCommand = useCallback((commandInput: string) => {
    const trimmed = commandInput.trim();
    if (!trimmed) return;

    const command = getCommand(trimmed);

    if (!command) {
      setCurrentOutput({
        command: trimmed,
        content: (
          <p className="terminal-output terminal-error">
            Command not found: {trimmed}. Type 'help' for available commands.
          </p>
        )
      });
      setInputValue('');
      return;
    }

    if (command.name === 'clear') {
      setCurrentOutput(null);
      setInputValue('');
      return;
    }

    setCurrentOutput({
      command: trimmed,
      content: command.execute()
    });
    setInputValue('');
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const availableCommands = getCommandNames();

  return {
    currentOutput,
    inputValue,
    availableCommands,
    executeCommand,
    handleInputChange
  };
};
