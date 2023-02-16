import { z } from "zod";
import { Prisma } from "@prisma/client";

const schema = z.object({
  body: z.string().max(250),
  stars: z.number().int().min(1).max(5),
  productId: z.string(),
}) satisfies z.Schema<Prisma.ReviewUncheckedCreateInput>;

export const ReviewValidation = Prisma.defineExtension({
  query: {
    review: {
      create({ args, query }) {
        args.data = schema.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = schema.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = schema.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = schema.parse(args.create);
        args.update = schema.partial().parse(args.update);
        return query(args);
      },
    },
  },
});
