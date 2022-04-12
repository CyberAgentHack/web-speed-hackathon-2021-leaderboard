import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

const user = () => {
  faker.locale = "en";
  const email = faker.internet.email().toLowerCase();
  faker.locale = "ja";
  const name = `${faker.name.lastName()}${faker.name.firstName()}`;
  faker.locale = "en";

  return {
    email,
    name,
  };
};

const measure = () => {
  const datetime = faker.date.between(
    "2022-04-01T10:00:00.000Z",
    "2022-04-01T19:00:00.000Z"
  );
  const score = faker.datatype.number({ min: 0, max: 100 });

  return {
    score,
    vrtUrl: 'https://example.com/archive.zip',
    createdAt: datetime,
    updatedAt: datetime,
  };
};

async function main() {
  const data = [
    "チーム縄文時代",
    "チーム弥生時代",
    "チーム飛鳥時代",
    "チーム奈良時代",
    "チーム平安時代",
    "チーム鎌倉時代",
    "チーム室町時代",
    "チーム安土桃山時代",
    "チーム江戸時代",
    "チーム明治時代",
  ].map((team) => ({
    name: team,
    Users: {
      create: [...Array(faker.datatype.number(3))].map(() => user()),
    },
    Measurements: {
      create: [...Array(faker.datatype.number({ min: 5, max: 15 }))].map(() =>
        measure()
      ),
    },
  }));

  await Promise.all(
    data.map((d) =>
      prisma.team.create({
        data: d,
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
