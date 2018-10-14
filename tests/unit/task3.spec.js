import { originalFunc, refactoredFunc, upgradedFunc } from '@/tasks/3';

function runEqualTest(func, name, result, ...params) {
  it(name, () => {
    const res = func(...params);

    expect(res).toBe(result);
    expect(res).toBe(originalFunc(...params));
  });
}

function runEqualTestForRefactored(...params) {
  runEqualTest(refactoredFunc, ...params);
}

function runEqualTestForUpgraded(...params) {
  runEqualTest(upgradedFunc, ...params);
}

describe('Task 3', () => {
  describe('refactored (only) function', () => {
    runEqualTestForRefactored('find first char index', 2, 'abcd', 'c', 'b');
    runEqualTestForRefactored('find second char index', 2, 'abcd', 'b', 'c');
    runEqualTestForRefactored('find index of small number argument (from 0 to 9)', 2, 'a12b', 1, 2);
    runEqualTestForRefactored('return -1 for string with more than two characters', -1, 'ab12cd', '12', 'cd');
    runEqualTestForRefactored('return -1 for big number argument (not from 0 to 9)', -1, '123456', 23, 45);
    runEqualTestForRefactored('return -1 for characters placed on 0 index', -1, 'abc', 'a', 'd');
    runEqualTestForRefactored('not find other arguments', -1, 'abc', 'q', 'w', 'e', 'r', 't', 'c', 'b', 'a');

    it('get TypeError when first argument is not a string', () => {
      const params = [123, 1, 2];

      expect(() => refactoredFunc(...params)).toThrow(TypeError);
      expect(() => originalFunc(...params)).toThrow(TypeError);
    });
  });

  describe('upgraded function', () => {
    runEqualTestForUpgraded('find first char index', 2, 'abcd', 'c', 'b');
    runEqualTestForUpgraded('find second char index', 2, 'abcd', 'b', 'c');
    runEqualTestForUpgraded('return -1 for string with more than two characters', -1, 'ab12cd', '12', 'cd');

    it('return -1 when first argument is not a string', () => {
      expect(upgradedFunc(123, '1', '2')).toBe(-1);
    });

    it('return -1 for number argument', () => {
      expect(upgradedFunc('1234', 2, 3)).toBe(-1);
    });

    it('find characters placed on 0 index', () => {
      expect(upgradedFunc('abc', 'a', 'd')).toBe(0);
    });

    it('work for many arguments', () => {
      expect(upgradedFunc('abc', 'q', 'w', 'e', 'r', 't', 'c', 'b', 'a')).toBe(2);
    });
  });
});
