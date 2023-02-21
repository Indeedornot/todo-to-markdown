import {taskSymbols, isTask} from '../src/task';
describe('Test task capture regex', () => {
	describe('Correct task', () => {
		test('Task with not done', () => {
			taskSymbols.box.forEach((symbol) => {
				const task = `${symbol} Task`;
				const match = isTask(task);
				expect(match).not.toBeNull();
				expect(match?.done).toBe(false);

				const whitespaceTask = `  ${symbol} Task`;
				const whitespaceMatch = isTask(whitespaceTask);
				expect(whitespaceMatch).not.toBeNull();
				expect(whitespaceMatch?.done).toBe(false);

				const whitespaceTask2 = `  ${symbol}   Task`;
				const whitespaceMatch2 = isTask(whitespaceTask2);
				expect(whitespaceMatch2).not.toBeNull();
				expect(whitespaceMatch2?.done).toBe(false);
			});
		});

		test('Task with done', () => {
			taskSymbols.done.forEach((symbol) => {
				const task = `${symbol} Task`;
				const match = isTask(task);
				expect(match).not.toBeNull();
				expect(match?.done).toBe(true);

				const whitespaceTask = `  ${symbol} Task`;
				const whitespaceMatch = isTask(whitespaceTask);
				expect(whitespaceMatch).not.toBeNull();
				expect(whitespaceMatch?.done).toBe(true);

				const whitespaceTask2 = `  ${symbol}   Task`;
				const whitespaceMatch2 = isTask(whitespaceTask2);
				expect(whitespaceMatch2).not.toBeNull();
				expect(whitespaceMatch2?.done).toBe(true);
			});
		});
	});
});
