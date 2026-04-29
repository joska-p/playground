import { visit } from "unist-util-visit";

export function remarkBaseUrl({ base }) {
  return (tree) => {
    visit(tree, "link", (node) => {
      // If link starts with / but not // (which is an external protocol-relative link)
      if (node.url.startsWith("/") && !node.url.startsWith("//")) {
        // Prepend the base URL and ensure no double slashes
        const cleanBase = base.replace(/\/$/, "");
        node.url = `${cleanBase}${node.url}`;
      }
    });
  };
}
