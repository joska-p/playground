// Map a content collection id to its site route slug. TypeDoc emits `<internal>`
// files (referenced by module links); those stay in the collection for link
// targets but their URLs drop the angle brackets.
export function routeSlug(id: string): string {
    return id.replace(/\.<internal>$/, '.internal');
}
