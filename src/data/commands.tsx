import { Command, CommandRegistry } from '../types/terminal';

const CV_DATA = {
  name: 'Giacomo Robino',
  title: 'Software Engineer',
  location: 'Ticino, Switzerland',
  about: 'Full Stack Developer with experience in IoT, banking, and cloud solutions.',
  skills: {
    backend: ['Python', 'Java', 'FastAPI', 'Quarkus', 'Kafka', 'MQTT'],
    frontend: ['React', 'Angular', 'TypeScript'],
    other: ['Docker', 'Git', 'LLMs']
  },
  experience: [
    { years: '2023-2025', company: 'Paradox Engineering', role: 'Full Stack Cloud Developer' },
    { years: '2021-2023', company: 'Cluster Reply', role: 'Frontend Developer (Angular)' },
    { years: '2019-2021', company: 'Hanon System', role: 'Software Engineer (Python)' }
  ],
  studies: [
    { year: '2019', degree: 'Bachelor in Computer Science', school: 'University of Turin' },
    { year: '2014', degree: 'Master in Law', school: 'University of Turin' }
  ],
  contact: {
    email: 'robinogiacomo@gmail.com',
    linkedin: 'https://www.linkedin.com/in/giacomo-robino-4196ba62/'
  },
  articles: [
    {
      title: 'HumanBase, a Human-to-Moltbook Interface',
      description: 'An interface enabling humans to participate in an AI agent-populated social network',
      url: 'https://grobino.substack.com/p/humanbase-a-human-to-moltbook-interface'
    },
    {
      title: 'Create your first Claude Code Plugin',
      description: 'A beginner\'s guide to developing Claude Code plugins',
      url: 'https://grobino.substack.com/p/create-your-first-claude-code-plugin'
    },
    {
      title: 'LLamapedia',
      description: 'A self-generating wiki framework using LLMs',
      url: 'https://grobino.substack.com/p/llamapedia'
    }
  ]
};

const commands: CommandRegistry = {
  whoami: {
    name: 'whoami',
    description: 'Display user identity',
    execute: () => (
      <div className="terminal-output">
        <p>{CV_DATA.name} - {CV_DATA.title} </p>
        <p>Living in Riva San Vitale, Ticino, Switzerland </p>
      </div>
    )
  },

  about: {
    name: 'about',
    description: 'Show about information',
    aliases: ['cat about.txt'],
    execute: () => (
      <div className="terminal-output">
        <p>{CV_DATA.about}</p>
        <p>Based in {CV_DATA.location}.</p>
      </div>
    )
  },

  skills: {
    name: 'skills',
    description: 'List technical skills',
    aliases: ['ls skills/'],
    execute: () => (
      <div className="terminal-output">
        <p>Backend: {CV_DATA.skills.backend.join(', ')}</p>
        <p>Frontend: {CV_DATA.skills.frontend.join(', ')}</p>
        <p>Other: {CV_DATA.skills.other.join(', ')}</p>
      </div>
    )
  },

  experience: {
    name: 'experience',
    description: 'Show work experience',
    aliases: ['cat experience.txt'],
    execute: () => (
      <div className="terminal-output">
        {CV_DATA.experience.map((exp, i) => (
          <p key={i}>{exp.years} {exp.company} - {exp.role}</p>
        ))}
      </div>
    )
  },

  studies: {
    name: 'studies',
    description: 'Show education',
    aliases: ['cat studies.txt'],
    execute: () => (
      <div className="terminal-output">
        {CV_DATA.studies.map((study, i) => (
          <p key={i}>{study.year} {study.degree} - {study.school}</p>
        ))}
      </div>
    )
  },

  contact: {
    name: 'contact',
    description: 'Show contact information',
    execute: () => (
      <div className="terminal-output">
        <p>Email: {CV_DATA.contact.email}</p>
        <p>LinkedIn: <a href={CV_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="terminal-link">Profile</a></p>
      </div>
    )
  },

  articles: {
    name: 'posts',
    description: 'List posts',
    execute: () => (
      <div className="terminal-output">
        {CV_DATA.articles.map((article, i) => (
          <div key={i}>
            <p><strong>{article.title}</strong></p>
            <p>{article.description}</p>
            <p><a href={article.url} target="_blank" rel="noopener noreferrer" className="terminal-link">{article.url}</a></p>
          </div>
        ))}
      </div>
    )
  },

  help: {
    name: 'help',
    description: 'Show available commands',
    aliases: ['?'],
    execute: () => (
      <div className="terminal-output">
        <p>Available commands:</p>
        {Object.values(commands)
          .filter(cmd => cmd.name !== 'clear')
          .map(cmd => (
            <p key={cmd.name}>  {cmd.name.padEnd(12)} - {cmd.description}</p>
          ))}
        <p>  clear        - Clear the terminal</p>
      </div>
    )
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal output',
    execute: () => null
  }
};

export const getCommand = (input: string): Command | null => {
  const normalized = input.toLowerCase().trim();

  if (commands[normalized]) return commands[normalized];

  for (const cmd of Object.values(commands)) {
    if (cmd.aliases?.some(alias => alias.toLowerCase() === normalized)) {
      return cmd;
    }
  }

  return null;
};

export const getCommandNames = (): string[] => Object.keys(commands).filter(name => name !== 'clear');

export default commands;
