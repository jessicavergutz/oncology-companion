# Mega Brain - AI Knowledge Management System

## Overview
AI-powered system that transforms expert materials (videos, PDFs, transcriptions) into structured playbooks, DNA schemas, and mind-clone agents. Powered by JARVIS orchestrator.

## Quick Start
1. Run `npx mega-brain-ai setup` (auto-triggers on first use if `.env` missing)
2. Fill in API keys when prompted (only `OPENAI_API_KEY` is required)
3. Use `/jarvis-briefing` to see system status

## Architecture
- `packages/core/`: Processing engine (tasks, workflows, protocols)
- `packages/agents/`: AI agent definitions (conclave, cargo, minds)
- `packages/cli/`: Command-line tools (cli.js, push.js)
- `packages/video/`: **[NEW]** Remotion video components and templates
- `.claude/`: Claude Code integration (hooks, skills, rules)
- `knowledge/`: Knowledge base (playbooks, dossiers, schemas)
- `artifacts/`: Processing pipeline stages
- `inbox/`: Raw input materials
- `docs/`: Documentation and plans

## Commands
| Command | Description |
|-----------|-------------|
| `/jarvis-briefing` | System status + health score |
| `/jarvis-full` | Full pipeline (ingest + process + enrich) |
| `/conclave` | Multi-agent deliberation session |
| `/ingest` | Ingest new material |
| `/save` | Save current session |
| `/resume` | Resume previous session |
| `generate daily report` | Generate a daily AI cost and efficiency report |

## Agents
See [AGENTS.md](file:///Users/jessicavergutz/Documents/Projects/mega-brain/AGENTS.md) for a full list of available agents.

## Project Policies
- Plans MUST be saved to `docs/plans/`.
- All credentials must live in `.env`.
- Root `CLAUDE.md` and `.claude/CLAUDE.md` are the primary instruction sources.
