export function kebabCaseToTitleCase(inputText) {
    const inputWithDashesConvertedToSpaces = inputText.replaceAll("-", " ");
    const inputConvertedToTitleCase = inputWithDashesConvertedToSpaces.replace(/\b([a-z])/g, (match) => match.toUpperCase());
    return inputConvertedToTitleCase;
};