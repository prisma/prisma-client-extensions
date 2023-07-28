import { Prisma, PrismaClient } from "@prisma/client";
import { Profile } from "./schemas";

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      profile: {
        needs: { profile: true },
        compute({ profile }) {
          return Profile.parse(profile);
        },
      },
    },
  },

  query: {
    user: {
      create({ args, query }) {
        args.data.profile = Profile.parse(args.data.profile);
        return query(args);
      },
      createMany({ args, query }) {
        const users = Array.isArray(args.data) ? args.data : [args.data];
        for (const user of users) {
          user.profile = Profile.parse(user.profile);
        }
        return query(args);
      },
      update({ args, query }) {
        if (args.data.profile !== undefined) {
          args.data.profile = Profile.parse(args.data.profile);
        }
        return query(args);
      },
      updateMany({ args, query }) {
        if (args.data.profile !== undefined) {
          args.data.profile = Profile.parse(args.data.profile);
        }
        return query(args);
      },
      upsert({ args, query }) {
        args.create.profile = Profile.parse(args.create.profile);
        if (args.update.profile !== undefined) {
          args.update.profile = Profile.parse(args.update.profile);
        }
        return query(args);
      },
    },
  },
});

type User = Prisma.Result<typeof prisma.user, {}, "findFirstOrThrow">;

async function main() {
  const users = await prisma.user.findMany({ take: 10 });
  users.forEach(renderUser);
}

function renderUser({
  id,
  email,
  profile: { firstName, lastName, avatar, contactInfo, socialLinks },
}: User) {
  const card = [
    "===============================================================================",
    `User: ${email}`,
    `ID:   ${id}`,
    "-------------------------------------------------------------------------------",
    (firstName || lastName) &&
      `Name: ${firstName ? firstName + " " : ""}${lastName || ""}`,
    avatar &&
      `
Avatar:
  URL: ${avatar.url}
  Cropping Info:
    Top:    ${(avatar.crop.top * 100).toFixed(0)}%
    Right:  ${(avatar.crop.right * 100).toFixed(0)}%
    Bottom: ${(avatar.crop.bottom * 100).toFixed(0)}%
    Left:   ${(avatar.crop.left * 100).toFixed(0)}%`,
    contactInfo && "\nContact Info:",
    contactInfo?.email && `  Email:   ${contactInfo.email}`,
    contactInfo?.phone && `  Phone #: ${contactInfo.phone}`,
    contactInfo?.address &&
      `  Address: ${contactInfo.address.street}
           ${contactInfo.address.city}, ${contactInfo.address.region} ${contactInfo.address.postalCode}
           ${contactInfo.address.country}`,
    socialLinks && "\nSocial Links:",
    socialLinks?.website && `  Website:  ${socialLinks.website}`,
    socialLinks?.twitter && `  Twitter:  ${socialLinks.twitter}`,
    socialLinks?.github && `  GitHub:   ${socialLinks.github}`,
    socialLinks?.linkedin && `  LinkedIn: ${socialLinks.linkedin}`,
    "===============================================================================\n\n",
  ]
    .filter((line) => line)
    .join("\n");

  console.info(card);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
