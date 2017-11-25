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


const activationOne = {
	respondentsIds: 'c2bsab3c-f83d-4870-a351-429198c4ead1',
	shareLink: 'http://link',
	name: 'quizName',
	quiz: quizOne,
	activationOptions: 'c2bsab3c-f83d-4870-a351-429198c4ead2',
};


module.exports = {
	activationOne,
};
