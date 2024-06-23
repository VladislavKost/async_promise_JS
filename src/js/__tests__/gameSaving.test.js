import { GameSavingLoader } from "../gameSaving";

test("game saving loader test", async () => {
  const loader = new GameSavingLoader();
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

test("game saving loader error test", async () => {
  try {
    const loader = new GameSavingLoader();
    loader.gameSavings = undefined;
    await loader.load();
  } catch (e) {
    expect(e.message).toEqual("some error");
  }
});
