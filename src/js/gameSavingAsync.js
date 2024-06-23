import read from "./reader";
import json from "./parser";
import { GameSaving } from "./gameSaving";

export class GameSavingLoaderAsync {
  constructor() {
    this.gameSavings = [];
  }
  async load() {
    try {
      const data = await read();
      let value = await json(data);
      value = JSON.parse(value);
      const gameSaving = new GameSaving(...Object.values(value));
      this.gameSavings = [...this.gameSavings, gameSaving];
    } catch {
      throw new Error("some error");
    }
  }
}
