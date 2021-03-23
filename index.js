const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

let comments = [
	{
		id: uuid(),
		username: 'Justin',
		comment: 'This is really interesting',
	},
	{
		id: uuid(),
		username: 'Grace',
		comment: 'I am excited to try this out',
	},
	{
		id: uuid(),
		username: 'Jameela',
		comment: "Nice! I didn't know that it worked this way",
	},
	{
		id: uuid(),
		username: 'John',
		comment: 'Boo! This seems difficult',
	},
];

// Setup for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helps us parse body
app.use(express.urlencoded({ extended: true }));

// Method Override
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.send('Home');
});

app.get('/comments', (req, res) => {
	res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
	res.render('comments/new');
});

app.post('/comments', (req, res) => {
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuid() });
	res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
	const { id } = req.params;
	const updatedComment = req.body.comment;
	const foundComment = comments.find((c) => c.id === id);
	foundComment.comment = updatedComment;
	res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
	const { id } = req.params;
	comments = comments.filter((c) => c.id !== id);
	res.redirect('/comments');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
