const successResult = {
	questions: [
		{
			id: '5af41f98-ee8f-4754-8587-1ae520aa2969',
			answers: ['f6aadbd0-f5a0-4d0a-a776-66ce521208ce', '05b33b14-c33c-4d8d-bd44-f944bbf85f3e'],
		},
		{
			id: '2050f13e-56fc-4b79-b834-48f5a7c84f1f',
			answers: ['c39cdabe-8c8e-4379-95f5-e4f1633d7621', 'c3d0e5a7-da53-491a-af16-12b62082a23f'],
		},
	],
};

const partialResult = {
	questions: [
		{
			id: '5af41f98-ee8f-4754-8587-1ae520aa2969',
			answers: ['05b33b14-c33c-4d8d-bd44-f944bbf85f3e'],
		},
		{
			id: '2050f13e-56fc-4b79-b834-48f5a7c84f1f',
			answers: ['c39cdabe-8c8e-4379-95f5-e4f1633d7621', 'c3d0e5a7-da53-491a-af16-12b62082a23f'],
		},
	],
};

const invalidResultOne = {
	questions: [
		{
			id: '738egrkrlfe;e',
			answers: ['f6aadbd0-f5a0-4d0a-a776-66ce521208ce', '05b33b14-c33c-4d8d-bd44-f944bbf85f3e'],
		},
		{
			id: '2050f13e-56fc-4b79-b834-48f5a7c84f1f',
			answers: ['c39cdabe-8c8e-4379-95f5-e4f1633d7621', 'c3d0e5a7-da53-491a-af16-12b62082a23f'],
		},
	],
};

const invalidResultTwo = {
	questions: [
		{
			id: '5af41f98-ee8f-4754-8587-1ae520aa2969',
			answers: ['f6aadbd0-f5a0-4d0a-a776-66ce521208ce', '05b33b14-c33c-4d8d-bd44-f944bbf85f3e'],
		},
		{
			id: '2050f13e-56fc-4b79-b834-48f5a7c84f1f',
		},
	],
};

module.exports = {
	successResult,
	partialResult,
	invalidResultOne,
	invalidResultTwo,
};
