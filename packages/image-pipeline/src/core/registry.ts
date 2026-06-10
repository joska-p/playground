import type { ManipulationDefinition } from './image-pipeline.types';

export class Registry {
  private readonly manipulationsMap = new Map<string, ManipulationDefinition>();

  static from(definitions: readonly ManipulationDefinition[]) {
    const registry = new Registry();
    for (const definition of definitions) {
      registry.register(definition);
    }
    return registry;
  }

  register(definition: ManipulationDefinition) {
    if (!definition.id) {
      throw new Error(
        `[image-pipeline] Manipulation must have a non-empty string identifier`
      );
    }

    if (
      definition.access === 'neighborhood' &&
      (definition.radius == null || definition.radius < 0)
    ) {
      throw new Error(
        `[image-pipeline] Neighborhood manipulation "${definition.id}" must declare a non-negative radius`
      );
    }

    if (this.manipulationsMap.has(definition.id)) {
      console.warn(
        `[image-pipeline] Overwriting existing manipulation "${definition.id}"`
      );
    }
    this.manipulationsMap.set(definition.id, definition);
  }

  get(identifier: string) {
    const definition = this.manipulationsMap.get(identifier);
    if (!definition) {
      throw new Error(
        `[image-pipeline] Manipulation "${identifier}" is not registered.`
      );
    }
    return definition;
  }

  has(identifier: string) {
    return this.manipulationsMap.has(identifier);
  }

  clear() {
    this.manipulationsMap.clear();
  }
}
