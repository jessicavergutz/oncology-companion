# Mega Brain Agents

This document provides an overview of the AI agents powered by the Mega Brain system.

## Agent Types

### 1. System Agents (L0)
Core orchestrators and utility agents.
- **JARVIS** (`@jarvis`): The primary system orchestrator for knowledge extraction and pipeline management.
- **Agent-Creator** (`/create-agent`): Utility for generating new agent personas.

### 2. Conclave (L1)
Multi-perspective deliberation sessions.
- **Conclave** (`/conclave`): Triggers a council session where multiple agents debate a topic based on extracted evidence.

### 3. Mind Clones (L3)
Agents that reason like specific experts, grounded in their actual materials.
- **Expert Minds**: Located in `agents/minds/`. Activated via `/ask [agent-id]`.

### 4. Cargo Agents (L4)
Functional role agents that synthesize knowledge from multiple sources for specific business domains.
- **Sales, Marketing, Operations, Finance**: Located in `agents/cargo/`. Activated via `/ask [agent-id]`.

## Activation
- **Slash Commands**: Use commands like `/jarvis-briefing` or `/conclave` for system actions.
- **Direct Ask**: Use `/ask [agent-id]` to talk to a specific Mind or Cargo agent.
- **Registry**: See `.claude/agents.yaml` for the technical mapping of agent IDs and paths.

## Agent Registry Summary
| Type | Purpose | Count (approx) |
|------|---------|----------------|
| **CARGO** | Functional roles | 29 |
| **MINDS** | Expert clones | 5 |
| **CONCLAVE** | Deliberation | 3 |
| **SYSTEM** | Orchestration | 2 |

---
*Note: Agents are initialized during the pipeline processing phases (Phase 5).*
