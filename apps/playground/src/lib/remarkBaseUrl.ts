import { visit } from "unist-util-visit";

export function remarkBaseUrl({ base }: { base: string }) {
  return (tree: unknown) => {
    visit(tree as any, "link", (node: any) => {
      if (node.url.startsWith("/") && !node.url.startsWith("//")) {
        const cleanBase = base.replace(/\/$/, "");
        node.url = `${cleanBase}${node.url}`;
      }
    });
  };
}
