const faker = require('faker');
const fs = require('fs');

main();


function main() {
  const users = getUsers();
  const companies = getCompanies();
  console.info('Saving data', {
    user: users.length,
    companies: companies.length
  });
  saveData({ users, companies })
}

/**
 * @returns Object[]
 */
function getUsers() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const datum = {
      id: (i + 1),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gender: faker.name.gender(),
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      jobTitle: faker.name.title()
    };
    data.push(datum);
  }
  console.info(data);
  return data;
}

/**
 * @returns Object[]
 */
function getCompanies() {
  const data = [];
  for (let i = 0; i < 250; i++) {
    const datum = {
      id: (i + 1),
      name: faker.company.companyName(),
      companySuffix: faker.company.companySuffix(),
      catchPhrase: faker.company.catchPhrase(),
    };
    data.push(datum);
  }
  console.info(data);
  return data;
}


/**
 * @param data Object
 * @returns void
 */
function saveData(data) {
  const toWrite = JSON.stringify(data);
  fs.writeFileSync('./tools/json-server/db.json', toWrite);
}

