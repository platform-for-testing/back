const activationOne = {
	quizId: '',
	activationOptions: 'c2bsab3c-f83d-4870-a351-429198c4ead2',
};

const expectedActivation = {
	quiz: {
		title: 'Hard quiz',
		description: 'Short description for this quiz',
		__v: 0,
		questions:
            [{
            	type: 2,
            	points: 20,
            	title: 'What is life?',
            	description: 'Short description for this question',
            	answers:
                    [{ title: 'life', isCorrect: true },
                    	{ title: 'Who nows', isCorrect: false },
                    	{ title: 'death', isCorrect: false }],
            },
            {
            	type: 3,
            	points: 10,
            	title: 'Where is Canada?',
            	description: 'tricky question',
            	answers:
                        [{ title: 'in the Africa', isCorrect: true },
                        	{ title: 'in London', isCorrect: false },
                        	{ title: 'pass', isCorrect: false }],
            },
            {
            	type: 2,
            	points: 15,
            	title: 'How old are you?',
            	answers:
                        [{ title: '< 20', isCorrect: true },
                        	{ title: '20 - 40', isCorrect: true },
                        	{ title: '40 - 60', isCorrect: false },
                        	{ title: '>60', isCorrect: false }],
            }],
	},
	shareLink: 'http://some-url.com',
	activationOptions: 'c2bsab3c-f83d-4870-a351-429198c4ead2',
	respondentsIds: [],
};


module.exports = {
	activationOne,
	expectedActivation,
};
