import { observable } from "@legendapp/state";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { deepCopy } from "./utils";

export type OptionType = {
  uuid: string;
  optionsType: "story" | "menu";
  titleImageRef?: string;
  titleAudioRef?: string;

  storyActionUuid?: string;
  storyUuid?: string;
  storyAudioRef?: string;

  actionUuid?: string;
  options?: OptionType[];
};

export type State = {
  metadata: { title: string; author: string; description: string };
  initialOption: OptionType;
};

export const defaultState: State = {
  metadata: {
    title: "",
    author: "",
    description: "",
  },
  initialOption: {
    uuid: "0",
    optionsType: "menu",
    titleImageRef: "",
    titleAudioRef: "",
    options: [],
  },
};
export const state$ = observable<{
  ui: {
    scale: number;
    redrawArrow: number;
  };
  state: State;
}>({
  ui: {
    scale: 1,
    redrawArrow: 0,
  },
  state: deepCopy(defaultState),
});
export const resetState = () => state$.state.set(deepCopy(defaultState));

configureObservablePersistence({
  persistLocal: ObservablePersistLocalStorage,
});

persistObservable(state$.state, {
  local: "state",
});