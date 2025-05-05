import app from "./app";
import config from "./utils/config";

app.listen(config.PORT, () => {
  console.log("Server runnin on http://localhost:3000");
});
