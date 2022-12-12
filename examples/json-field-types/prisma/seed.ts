import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { Profile } from "../src/schemas";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({});

  // Create 100 random users
  await prisma.user.createMany({
    data: Array.from({ length: 100 }, () => ({
      email: faker.helpers.unique(faker.internet.email),
      profile: buildProfile(),
    })),
  });

  console.log(`Database has been seeded. 🌱`);
}

/** Creates a random `Profile` object which may have optional fields omitted */
function buildProfile() {
  const profile: Profile = {};

  maybe(0.9, () => {
    profile.firstName = faker.name.firstName();
  });
  maybe(0.8, () => {
    profile.lastName = faker.name.lastName();
  });
  maybe(0.5, () => {
    profile.avatar = {
      url: faker.image.unsplash.people(),
      crop: {
        top: faker.datatype.float({ min: 0, max: 0.4, precision: 0.01 }),
        right: faker.datatype.float({ min: 0, max: 0.4, precision: 0.01 }),
        bottom: faker.datatype.float({ min: 0, max: 0.4, precision: 0.01 }),
        left: faker.datatype.float({ min: 0, max: 0.4, precision: 0.01 }),
      },
    };
  });
  maybe(0.8, () => {
    (profile.contactInfo ??= {}).email = faker.internet.email();
  });
  maybe(0.4, () => {
    (profile.contactInfo ??= {}).phone = faker.phone.number();
  });
  maybe(0.3, () => {
    (profile.contactInfo ??= {}).address = {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      region: faker.address.state(),
      postalCode: faker.address.zipCode(),
      country: faker.address.country(),
    };
  });
  maybe(0.5, () => {
    (profile.socialLinks ??= {}).twitter = faker.internet.url();
  });
  maybe(0.5, () => {
    (profile.socialLinks ??= {}).github = faker.internet.url();
  });
  maybe(0.5, () => {
    (profile.socialLinks ??= {}).website = faker.internet.url();
  });
  maybe(0.5, () => {
    (profile.socialLinks ??= {}).linkedin = faker.internet.url();
  });

  return Profile.parse(profile);
}

function maybe<T>(probability: number, callback: () => T) {
  return faker.helpers.maybe(callback, { probability });
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
