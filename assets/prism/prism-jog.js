/**
 * Prism language definition for Jog.
 * Keywords / types aligned with JogDocs guide/JogQuickRef.md (V1 surface).
 * Prism 1.29.x compatible.
 */
(function (Prism) {
  Prism.languages.jog = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true,
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true,
      },
    ],
    string: [
      // c"…" / x"…" prefixes
      {
        pattern: /\b[cx]"(?:\\.|[^"\\\r\n])*"/,
        greedy: true,
      },
      // raw `…`
      {
        pattern: /`[^`]*`/,
        greedy: true,
      },
      // ordinary "…"
      {
        pattern: /"(?:\\.|[^"\\\r\n])*"/,
        greedy: true,
      },
    ],
    char: {
      pattern: /'(?:\\.|[^'\\\r\n])+'/,
      greedy: true,
    },
    keyword:
      /\b(?:actual|as|break|bytes|const|continue|context|defer|else|enum|errdefer|escaping|expect|extern|fn|for|go|if|import|in|interface|is|private|quote|return|struct|type|val|var|when|with)\b/,
    boolean: /\b(?:false|true)\b/,
    null: {
      pattern: /\bnull\b/,
      alias: "constant",
    },
    number: [
      /\b0b[01_]+(?:i(?:8|16|32|64)|u(?:8|16|32|64))?\b/i,
      /\b0o[0-7_]+(?:i(?:8|16|32|64)|u(?:8|16|32|64))?\b/i,
      /\b0x[\da-f_]+(?:i(?:8|16|32|64)|u(?:8|16|32|64))?\b/i,
      /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?[\d_]+)?(?:f(?:32|64)|i(?:8|16|32|64)|u(?:8|16|32|64))?\b/i,
    ],
    // Builtin / common type names
    builtin: [
      /\bc\.char\b/,
      /\b(?:Allocator|Dispatcher|any|bool|char|error|f(?:32|64)|i(?:8|16|32|64|size)|str|u(?:8|16|32|64|size)|void)\b/,
    ],
    function: {
      pattern: /\b[a-z_]\w*(?=\s*\()/i,
      greedy: true,
    },
    "class-name": {
      pattern: /\b[A-Z]\w*\b/,
      greedy: true,
    },
    operator:
      /!!|\?\.|\?:|\.\.[=.]?|&&|\|\||<<|>>|[+\-*/%&|^!=<>]=?|~|\?/,
    punctuation: /[{}[\];(),.:@]/,
  };

  // Aliases if authors use ```Jog
  Prism.languages.Jog = Prism.languages.jog;
})(Prism);
