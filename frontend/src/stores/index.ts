import { createEvent, createStore } from "effector";
import type { Identity } from "src/proto";

export const setStage = createEvent<"auth" | "profiles" | "settings">();

export const stage = createStore<"auth" | "profiles" | "settings">("auth").on(
	setStage,
	(_, stage) => stage,
);

export const setResolver = createEvent<"auth" | "profiles" | "settings">();

export const resolver = createStore(Promise.resolve());

export const setIdentities = createEvent<(Identity & { icon: string })[]>();

export const identities = createStore<(Identity & { icon: string })[]>([]).on(
	setIdentities,
	(_, V) => V,
);
