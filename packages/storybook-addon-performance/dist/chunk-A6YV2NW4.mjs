// src/task-runner/async.ts
function waitForFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}
async function asyncMap({
  source,
  map
}) {
  const results = [];
  for (let i = 0; i < source.length; i++) {
    await waitForFrame();
    const value = await map(source[i], i, source);
    results.push(value);
  }
  return results;
}
async function asyncFor({ count, fn }) {
  for (let i = 0; i < count; i++) {
    await waitForFrame();
    await fn(i);
  }
}

export {
  asyncMap,
  asyncFor
};
