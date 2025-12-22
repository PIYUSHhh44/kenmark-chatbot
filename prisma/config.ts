import { defineDatasources } from "@prisma/adapter-node-edge";

export default defineDatasources({
  db: {
    url: process.env.DATABASE_URL!,
  },
});
