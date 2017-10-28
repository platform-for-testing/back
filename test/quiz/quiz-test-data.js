const questionOne = {
	type: 2,
	points: 20,
	question: 'What is life?',
	description: 'Short description for this question',
	answers: ['life', 'Who nows', 'death'],
};

const questionTwo = {
	type: 3,
	points: 10,
	question: 'Where is Canada?',
	description: 'tricky question',
	answers: ['in the Africa', 'in London', 'pass']
};

const questionTree = {
	type: 0,
	points: 1,
	question: 'What is your name?',
};

const questionFour = {
	type: 2,
	points: 15,
	question: 'How old are you?',
	answers: ['< 20', '20 - 40', '40 - 60', '>60'],
};

const quizOne = {
	title: 'Simple quiz',
	questions: [questionTree, questionFour],
};

const quizTwo = {
	title: 'Hard quiz',
	questions: [questionOne, questionTwo, questionFour],
};

const quizes = [quizOne, quizTwo];

module.exports = {
	questionOne,
	questionTwo,
	questionTree,
	questionFour,
	quizOne,
	quizTwo,
	quizes,
};
