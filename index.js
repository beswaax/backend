//you have to make a situation for all of these, i.e when a note gets request GET, POST, DELETE, PUT etc.
//data you send on the server has to be json data, server data is always json.

//import express module.
const express = require("express");
const { response } = require("express");
//make app an express application
const app = express();
const cors = require("cors");
//json-parses is taken with this command:
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

// app.get("/notes", func(req,res)) or app.send or app.put is how the request is supposed to be responded to when a user goes to the /notes page. It is responded by running the "func" function, which will take in the request as an object as first parameter and res as second parameter, which is an object with methods to help you send back what you want. This all means that, when a use opens up /notes send this back.

//when a HTTP GET request is made to the application's root "/", run the function that is the second parameter with the request being the object form of the request and res an object with methods on to alter the data that will be sent back as a response.
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

//when a HTTP GET request is made at "/notes" sens notes formatted as a JSON String back
app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    //if no such object, then turn status to 404 and end.
    res.status(404).end();
  }
});

app.delete("notes/:id", (req, res) => {
  const id = Number(req.params.id);
  //updates notes array to an array without that object id
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  res.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
/*
//function inside of http.createServer will run automatically when request is made with req being the object form of the request and res being an object with a lot of stuff to edit the req.
const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(notes));
});

//when .createServer is run, it will return in JS an object full of methods to be able to edit the node running. .listen will change the port to a given value.


// create a .rest file to test requests. inside of it do this: 
GET http://localhost:3001/notes, this will make a GET request on notes page. DELETE http://localhost:3001/notes will make a DELETE request, can test if working there. Like postman
//install express library: npm install express --save
*/
