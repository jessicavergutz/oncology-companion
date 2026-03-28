# Skill: Remotion Video Generation

Skill to transform Mega Brain knowledge (playbooks, dossiers) into automated videos using Remotion.

## Context
Use this skill when the user asks to "visualize", "turn into video", or "create a presentation" of any extracted knowledge.

## Process
1. **Identify Data**: Extract the core title, subtitle, and key points from the dossier/playbook.
2. **Format JSON**: Prepare the `input-props.json` for Remotion.
3. **Render**: Run `npx remotion render MegaBrain-Playbook --props packages/video/input-props.json --output out/video.mp4`.

## Commands
- `/video-gen [path-to-dossier]`: Triggers the automation.
