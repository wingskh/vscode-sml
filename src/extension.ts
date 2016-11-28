// tslint:disable object-literal-sort-keys

import * as vs from "vscode";
import * as sml from "./language/sml";

export async function activate(context: vs.ExtensionContext) {
  context.subscriptions.push(vs.languages.setLanguageConfiguration("sml", sml.configuration));
}

export function deactivate() {
  return;
}
