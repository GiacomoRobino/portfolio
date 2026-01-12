import { ReactNode } from 'react';

export interface CommandOutput {
  command: string;
  content: ReactNode;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: () => ReactNode;
}

export type CommandRegistry = Record<string, Command>;
