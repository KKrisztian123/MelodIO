import { wordSubstringMatch } from "@/utils/utils";

/** Checks if the the condition string exists in any part of the main string. */
export const wordFilter = (value: string, condition: string) => {
  const words = value.toLowerCase().replace(/\s\s+/g, " ").split(" ");
  const conditionWords = condition
    .toLowerCase()
    .replace(/\s\s+/g, " ")
    .split(" ");
  const conditionWordCount = conditionWords.length;
  const startingWordIndex = words.indexOf(conditionWords[0]);
  if (startingWordIndex === -1)
    return conditionWordCount === 1
      ? words.some((word) => wordSubstringMatch(word, conditionWords[0]))
      : false;

  return conditionWords.every((conditionWord, index) => {
    if (index > conditionWordCount - 1) return false;
    if (words[startingWordIndex + index] === conditionWord) {
      return true;
    } else {
      return conditionWordCount - 1 === index
        ? wordSubstringMatch(words[startingWordIndex + index], conditionWord)
        : false;
    }
  });
};
