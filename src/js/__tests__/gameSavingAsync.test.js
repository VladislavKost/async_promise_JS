import { GameSavingLoaderAsync } from "../gameSavingAsync";

test("game saving loader async test", async () => {
  const loader = new GameSavingLoaderAsync();
  await loader.load();
  const gameSavings = loader.gameSavings;
  expect(gameSavings).toEqual([
    {
      id: 9,
      created: 1546300800,
      userInfo: { id: 1, name: "Hitman", level: 10, points: 2000 },
    },
  ]);
});

test("game saving loader async error test", async () => {
  try {
    const loader = new GameSavingLoaderAsync();
    loader.gameSavings = undefined;
    await loader.load();
  } catch (e) {
    expect(e.message).toEqual("some error");
  }
});
