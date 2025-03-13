import '@testing-library/jest-dom';

// Mock global fetch si es necesario
global.fetch = jest.fn();

// Silenciar las advertencias de React
jest.spyOn(console, 'error').mockImplementation(() => {});