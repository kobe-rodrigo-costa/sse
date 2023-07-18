import app from "./api";
const port = process.env.PORT || 3001;

app.server.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});
