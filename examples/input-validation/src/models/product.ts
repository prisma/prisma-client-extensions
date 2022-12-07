import { z } from "zod";
import { Prisma } from "../generated/client";

const schema = z.object({
  slug: z
    .string()
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().max(100),
  description: z.string().max(1000),
  price: z
    .instanceof(Prisma.Decimal)
    .refine((price) => price.gte("0.01") && price.lt("1000000.00")),
}) satisfies z.Schema<Prisma.ProductUncheckedCreateInput>;

export const ProductValidation = Prisma.defineExtension({
  name: "product-validation",
  query: {
    product: {
      create({ args, query }) {
        args.data = schema.parse(args.data);
        return query(args);
      },
      createMany({ args, query }) {
        args.data = z.array(schema).parse(args.data);
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
