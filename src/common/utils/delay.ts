async function delay(ms = 800) {
  await new Promise((resolve) => setTimeout(() => resolve(null), ms));
}

export default delay;
