const questionOne = {
	type: 2,
	points: 20,
	title: 'What is life?',
	description: 'Short description for this question',
	answers: [
		{ title: 'life', isCorrect: true },
		{ title: 'Who nows', isCorrect: false },
		{ title: 'death', isCorrect: false },
	],
};

const questionTwo = {
	type: 3,
	points: 10,
	title: 'Where is Canada?',
	description: 'tricky question',
	answers: [
		{ title: 'in the Africa', isCorrect: true },
		{ title: 'in London', isCorrect: false },
		{ title: 'pass', isCorrect: false },
	],
};

const questionTree = {
	type: 0,
	points: 1,
	title: 'What is your name?',
	answers: [
		{ title: 'Alex', isCorrect: true },
		{ title: 'Bob', isCorrect: true },
		{ title: 'Blob', isCorrect: false },
	],
};

const questionFour = {
	type: 2,
	points: 15,
	title: 'How old are you?',
	answers: [
		{ title: '< 20', isCorrect: true },
		{ title: '20 - 40', isCorrect: true },
		{ title: '40 - 60', isCorrect: false },
		{ title: '>60', isCorrect: false },
	],
};

const quizOne = {
	title: 'Simple quiz',
	description: 'Short description for this quiz',
	questions: [questionTree, questionFour],
};

const quizTwo = {
	title: 'Hard quiz',
	description: 'Short description for this quiz',
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
