import * as vs from "vscode";

const configuration: vs.LanguageConfiguration = {
  wordPattern: /\\[^\s]+|[^\\\s\d(){}\[\]#.][^\\\s(){}\[\]#.]*/,
};

export default configuration;
