import checkBraces from '@/tasks/1';

function runTest(name, param, result) {
  it(name, () => {
    expect(checkBraces(param)).toBe(result);
  });
}

describe('Task 1', () => {
  runTest('empty string', '', 0);
  runTest('one correct braces with other chars', '---(++++)----', 0);
  runTest('some correct braces with other chars', 'before ( middle []) after ', 0);
  runTest('many nested correct braces', '(  [  <>  ( {} )  ]  <>  )', 0);
  runTest('incorrect round braces: closing before opening', ') (', 1);
  runTest('incorrect curly braces: closing before opening', '} {', 1);
  runTest('incorrect braces: one into the other', '<(   >)', 1);
  runTest('incorrect braces: no closing brace', ' <   ', 1);
  runTest('incorrect braces: no closing brace in other', '   (      [)', 1);
  runTest('no string param', {}, 1);
});
