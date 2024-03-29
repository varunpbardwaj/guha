import server from "./server";

const PORT = process.env.port || 2023;

server.listen(PORT, () => {
  console.log(`Running on port: ${PORT}...`);
});

export default server;
