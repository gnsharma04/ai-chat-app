const calcPlugin = {
  name: "calc",
  command: "/calc",

  execute: async (input) => {
    // Allow: digits, + - * / % . ( ) and spaces
    const validMathPattern = /^[\d+\-*/%.() ]+$/;

    if (!input || !validMathPattern.test(input)) {
      return {
        error: "Invalid mathematical expression.",
        details: "Only numbers and basic operators are allowed.",
      };
    }

    try {
      const result = Function(`"use strict"; return (${input})`)();

      if (isNaN(result)) {
        throw new Error("Not a number");
      }

      return {
        expression: input,
        result: result.toString(),
      };
    } catch (error) {
      return {
        error: "Failed to evaluate expression.",
        details: error.message,
      };
    }
  },
};

export default calcPlugin;
