module.exports = {
	clearMocks: true,
	moduleFileExtensions: ['js', 'ts'],
	testMatch: ['**/*.test.ts'],
	transform: {
		'^.+\\.ts$': ['ts-jest', {diagnostics: {warnOnly: true}}],
	},
	verbose: true,
};