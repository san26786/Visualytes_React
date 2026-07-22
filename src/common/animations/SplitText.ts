export interface SplitWord {
    id: string;
    word: string;
    isBreak?: boolean;
  }
  
  export function splitText(text: string): SplitWord[] {
    const result: SplitWord[] = [];
  
    text.split("\n").forEach((line, lineIndex) => {
      line
        .trim()
        .split(/\s+/)
        .forEach((word, wordIndex) => {
          result.push({
            id: `${lineIndex}-${wordIndex}`,
            word,
          });
        });
  
      if (lineIndex < text.split("\n").length - 1) {
        result.push({
          id: `break-${lineIndex}`,
          word: "",
          isBreak: true,
        });
      }
    });
  
    return result;
  }