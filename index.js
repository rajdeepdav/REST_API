/* jshint esversion: 6 */


const Joi = require('joi');

const express = require('express');
const app = express();



app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];
app.get('/', (_req, res) => {
    res.send('Hello World!!!!');
});

app.get('/api/courses', (_req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);
        
        
   
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/course/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');


    //validate
    //If invalid, return 400 - Bad request

    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);
        
   

    // Update course
    courses.name = req.body.name;
    res.send(courses);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    // Look up the course
    //Not existing , return 404

    // Delete
    const index = courses.indexOf(courses);
    courses.splice(index, 1);

    //Return the same course
    res.send(courses);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
// /api.courses/1
app.get('/api/courses/:id', (_req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
// PROCESS - GLOBAL OBJECE
// PROCESS HAS PROPERTY CALLED - ENV
// NAME OF ENVIRONMENT VARIABLE IS PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));