const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password, name and number as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const dbName = 'phonebook-app';

const url = `mongodb+srv://fullstack:${password}@cluster0.fcmm8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log('Please provide the password, name and number as arguments: node mongo.js <password>');
  process.exit(1);
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
