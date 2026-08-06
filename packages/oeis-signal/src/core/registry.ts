import type { Module } from './types';
import { naturalsModule } from '../modules/naturals';

const modules: Module[] = [naturalsModule];

export function getModule(id: string): Module | undefined {
    return modules.find((m) => m.id === id);
}

export function getAllModules(): readonly Module[] {
    return modules;
}

export function registerModule(module: Module): void {
    if (modules.some((m) => m.id === module.id)) {
        throw new Error(`Module with id "${module.id}" already registered`);
    }
    modules.push(module);
}
