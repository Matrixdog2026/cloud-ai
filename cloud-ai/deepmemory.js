// deepMemory.js
export function buildDeepMemory(memoryDocs) {
    if (!memoryDocs.length) return "No memory yet.";

    // Combine all memory entries into one block
    const raw = memoryDocs.map(m =>
        `User: ${m.input}\nAI: ${m.response}`
    ).join("\n\n");

    // Create a compressed summary for long-term learning
    return `
==== LONG-TERM MEMORY ====
Summaries of past interactions:

${raw}

==========================

Use this memory to better understand the user. 
Remember their preferences, goals, tone, and style.
Learn patterns and improve future responses.
`;
}