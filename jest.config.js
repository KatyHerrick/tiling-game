module.exports = {
	transform: {'^.+\\.ts?$': 'ts-jest'},
	testEnvironment: 'node',
	testRegex: '/__tests__/.*/.*\\.(test|spec)?\\.(ts|tsx)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'src/(.*)': '<rootDir>/src/$1',
		'tests/(.*)': '<rootDir>/__tests__/$1',
	}
};