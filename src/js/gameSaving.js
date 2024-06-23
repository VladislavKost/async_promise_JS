import read from "./reader";
import json from "./parser";

export class GameSavingLoader {
  constructor() {
    this.gameSavings = [];
  }
  load() {
    return read()
      .then((data) => json(data))
      .then((value) => {
        value = JSON.parse(value);
        const gameSaving = new GameSaving(...Object.values(value));
        this.gameSavings = [...this.gameSavings, gameSaving];
      })
      .catch((error) => {
        throw new Error("some error");
      });
  }
}

export class GameSaving {
  constructor(id, created, userInfo) {
    this.id = id;
    this.created = created;
    this.userInfo = userInfo;
  }
}
