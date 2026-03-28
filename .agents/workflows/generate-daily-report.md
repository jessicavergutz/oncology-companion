---
description: Generate a daily report based on AI cost tracking.
---

When the user says "generate daily report", follow these steps as a **Financial Controller**:

1. **Read Data**: Read the file [cost-tracker.md](file:///Users/jessicavergutz/Documents/Projects/mega-brain/AI-System/cost-tracker.md).

2. **Calculate Metrics**:
    - **Total spent today**: Sum of all costs in the current day's section.
    - **Number of tasks**: Count of entries in the Logs table for today.
    - **Most expensive task**: Identify the task with the highest estimated cost.
    - **Cost distribution**: Break down tasks by Cost Level (LOW / MEDIUM / HIGH).

3. **Analyze and Audit**:
    - Identify **Wasteful tasks** (redundant, failed, or poorly scoped).
    - Identify tasks that should **not** have been performed by a high-level agent like Jarvis.
    - Suggest tasks that could be handled by cheaper tools (e.g., Raygen, simpler scripts).

4. **Generate Report**:
    Output the report using the following structure:

## 📊 Daily Cost Report

- **Total spent**: $[Amount]
- **Tasks executed**: [Number]
- **Most expensive task**: [Task Name] ([Cost])

## ⚠️ Waste Analysis
- [Direct, critical observation about inefficiency or waste]

## 🧠 Optimization Plan
- **Use Jarvis for**: [Strategic, high-complexity tasks]
- **Use cheaper tools for**: [Routine, low-complexity tasks]
- **Stop doing**: [Actions that provide low ROI or are redundant]

---
**Note**: Be direct, strategic, and critical. Maintain the persona of a financial controller focused on ROI and cost-efficiency.
