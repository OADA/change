import * as utils from "./utils";

interface Document {
  [x: string]: any;
}
interface Change {
  _delete?: boolean;
  [x: string]: any;
}

export function patch(document: Document, change: Change): Document {
  // If "_detele" is given, start a new document to replace contents
  if (change._delete === true) {
    document = {};
  }
  // Iterate over all entries in the change and modify "document"
  for (const key in change) {
    // Skip "_delete" key because that's already been taken care of
    if (key === "_delete") {
      continue;
    }
    // If an object is provided, we need to either 1) delete the entry
    // altogether (i.e., _delete is given) or 2) recursively modify the entry
    if (utils.isObject(change[key])) {
      // Case 1: delete the entry if "_delete" is given and that's the only entry in the object
      if (
        change[key]["_delete"] === true &&
        Object.keys(change[key]).length === 1
      ) {
        delete document[key];
      }
      // Case 2: recursively apply change
      else {
        document[key] = patch(document[key], change[key]);
      }
    }
    // If a non-object is provided, just copy that to the document
    else {
      document[key] = change[key];
    }
  }
  // That's all
  return document;
}

export function diff(document1: Document, document2: Document): Change {
  const change: Change = {};
  // Get union of keys
  const keys = new Set<string>([
    ...Object.keys(document1),
    ...Object.keys(document2),
  ]);
  // Iterate over all the keys that exist in either document1 or document2
  for (const key of keys) {
    // The key exists in document1 but not in document2
    if (key in document1 && !(key in document2)) {
      change[key] = { _delete: true }; // Mark the entry to be deleted
    }
    // The key exists in document2 but not in document1
    else if (!(key in document1) && key in document2) {
      change[key] = document2[key]; // It's a new entry so just copy it to change
    }
    // The key exists in both documents
    else {
      // If they are both objects, recursively generate a new change from that level
      if (utils.isObject(document1[key]) && utils.isObject(document2[key])) {
        change[key] = diff(document1[key], document2[key]);
      }
      // Otherwise, just copy the content to change
      else {
        change[key] = document2[key];
      }
    }
  }
  // That's all
  return change;
}
