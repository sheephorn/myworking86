import { describe, it, expect } from 'vitest';
import { Grade4MultiplicationGenerator } from '../../src/questions/Grade4MultiplicationGenerator';

describe('Grade4MultiplicationGenerator', () => {
  const generator = new Grade4MultiplicationGenerator();
  const TEST_ITERATIONS = 20;

  describe("when answerMode is 'choice'", () => {
    it('should generate a valid question object with options', () => {
      for (let i = 0; i < TEST_ITERATIONS; i++) {
        const question = generator.generate('choice');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('correctAnswer');
        expect(question).toHaveProperty('options');
        expect(question.options).toHaveLength(4);
        expect(question).toHaveProperty('showCalculationPad', false);
      }
    });

    it('should always include the correct answer in the options', () => {
      for (let i = 0; i < TEST_ITERATIONS; i++) {
        const question = generator.generate('choice');
        expect(question.options).toContain(question.correctAnswer);
      }
    });

    it('should have 4 unique options', () => {
      for (let i = 0; i < TEST_ITERATIONS; i++) {
        const question = generator.generate('choice');
        expect(new Set(question.options).size).toBe(4);
      }
    });
  });

  describe("when answerMode is 'calculationPad'", () => {
    it('should generate a valid question object without options', () => {
      for (let i = 0; i < TEST_ITERATIONS; i++) {
        const question = generator.generate('calculationPad');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('correctAnswer');
        expect(question.options).toEqual([]);
        expect(question).toHaveProperty('showCalculationPad', true);
        expect(question).toHaveProperty('num1');
        expect(question).toHaveProperty('num2');
      }
    });
  });

  it('should generate a mathematically correct problem regardless of mode', () => {
    for (let i = 0; i < TEST_ITERATIONS; i++) {
      // Test both modes
      const question1 = generator.generate('choice');
      const { num1: num1_1, num2: num2_1, correctAnswer: correctAnswer1 } = question1;
      expect(correctAnswer1).toBe(num1_1! * num2_1!);

      const question2 = generator.generate('calculationPad');
      const { num1: num1_2, num2: num2_2, correctAnswer: correctAnswer2 } = question2;
      expect(correctAnswer2).toBe(num1_2! * num2_2!);
    }
  });
});
