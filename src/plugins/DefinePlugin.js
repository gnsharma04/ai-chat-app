const definePlugin = {
  name: "define",
  command: "/define",

  execute: async (input) => {
    const word = input.trim().toLowerCase();

    if (!word) {
      return { error: "Please enter a word to define." };
    }

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();

      if (!Array.isArray(data)) {
        return { error: `Nothing found for "${word}".` };
      }

      const entry = data[0];
      const definitions = entry.meanings.flatMap((meaning) =>
        meaning.definitions.map((def) => ({
          partOfSpeech: meaning.partOfSpeech,
          definition: def.definition,
          example: def.example || null,
        }))
      );

      return {
        word: entry.word,
        phonetic: entry.phonetic || "",
        definitions: definitions.slice(0, 3),
      };
    } catch (err) {
      return {
        error: "Failed to fetch definition.",
        details: err.message,
      };
    }
  },
};

export default definePlugin;
