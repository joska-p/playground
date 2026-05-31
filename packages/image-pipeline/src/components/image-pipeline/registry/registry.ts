import type { ManipulationDefinition } from "../types";

export class Registry {
  private readonly map = new Map<string, ManipulationDefinition>();

  register(def: ManipulationDefinition): void {
    if (!def.id || typeof def.id !== "string") {
      throw new Error(`[image-pipeline] Manipulation must have a non-empty string id`);
    }
    if (!["pixel", "neighborhood", "whole"].includes(def.type)) {
      throw new Error(
        `[image-pipeline] Unknown manipulation type "${def.type}" for id "${def.id}"`
      );
    }
    if (def.type === "neighborhood" && (def.radius == null || def.radius < 0)) {
      throw new Error(
        `[image-pipeline] Neighborhood manipulation "${def.id}" must declare a non-negative radius`
      );
    }
    if (this.map.has(def.id)) {
      console.warn(`[image-pipeline] Overwriting existing manipulation "${def.id}"`);
    }
    this.map.set(def.id, def);
  }

  get(id: string): ManipulationDefinition {
    const def = this.map.get(id);
    if (!def) {
      throw new Error(
        `[image-pipeline] Manipulation "${id}" is not registered. Did you import its file?`
      );
    }
    return def;
  }

  has(id: string): boolean {
    return this.map.has(id);
  }

  clear(): void {
    this.map.clear();
  }
}
