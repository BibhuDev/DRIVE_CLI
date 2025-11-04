app.get("/files", async (req, res) => {
  const userId = "test-user";
  const files = await File.find({ userId });
  res.json(files);
});
