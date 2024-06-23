import { GameSavingLoaderAsync } from "../gameSavingAsync";
import read from "../reader";
import json from "../parser";

beforeEach(() => {
  jest.resetAllMocks();
});
jest.mock("../reader");
jest.mock("../parser");

test("json and read with mock test", async () => {
  const gameSavingData =
    '{"id":15,"created":1546450800,"userInfo":{"id":2,"name":"Bill","level":5,"points":1000}}';
  const fakeGameSaving = {
    id: 15,
    created: 1546450800,
    userInfo: { id: 2, name: "Bill", level: 5, points: 1000 },
  };

  read.mockResolvedValue(gameSavingData);
  json.mockResolvedValue(JSON.stringify(fakeGameSaving));

  const loader = new GameSavingLoaderAsync();
  await loader.load();

  expect(read).toHaveBeenCalledTimes(1);
  expect(json).toHaveBeenCalledTimes(1);
  expect(loader.gameSavings[0]).toEqual(fakeGameSaving);
});

it("json and read with mock error test", async () => {
  read.mockRejectedValue(new Error("Failed to read data"));

  const loader = new GameSavingLoaderAsync();

  await expect(loader.load()).rejects.toThrow("some error");

  expect(read).toHaveBeenCalledTimes(1);
  expect(json).not.toHaveBeenCalled();
  expect(loader.gameSavings).toEqual([]);
});
