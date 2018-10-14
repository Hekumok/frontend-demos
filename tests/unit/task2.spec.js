import deepCopy from '@/tasks/2';

describe('Task 2', () => {
  const originalObj = {
    undefinedProp: undefined,
    nullProp: null,
    NaNProp: NaN,
    numberProp: 1,
    stringProp: '1',
    boolProp: true,
    arrayProp: [
      {
        numberProp: 1,
      },
      new Date(),
      new Map([['key', 1]]),
      new Set([1]),
    ],
    dateProp: new Date(),
    mapProp: new Map([['obj', { numberProp: 1 }]]),
    setProp: new Set([1]),
    objProp: {
      numberProp: 1,
      objProp: {
        numberProp: 1,
      },
    },
  };

  originalObj.recursiveProp = originalObj;

  const obj = deepCopy(originalObj);

  it('have all the same properties', () => {
    expect(obj).toStrictEqual(originalObj);
  });

  it('are not the exact same', () => {
    expect(obj).not.toBe(originalObj);
  });

  it('Array property are not the exact same', () => {
    expect(obj.arrayProp).not.toBe(originalObj.arrayProp);
  });

  obj.arrayProp.forEach((value, index) => {
    it(`element by index ${index} in array property are not the exact same`, () => {
      expect(value).not.toBe(originalObj.arrayProp[index]);
    });
  });

  it('Date property are not the exact same', () => {
    expect(obj.dateProp).not.toBe(originalObj.dateProp);
  });

  it('Map property are not the exact same', () => {
    expect(obj.mapProp).not.toBe(originalObj.mapProp);
  });

  it('object in Map property are not the exact same', () => {
    expect(obj.mapProp.get('obj')).not.toBe(originalObj.mapProp.get('obj'));
  });

  it('Set property are not the exact same', () => {
    expect(obj.setProp).not.toBe(originalObj.setProp);
  });

  it('Object property are not the exact same', () => {
    expect(obj.objProp).not.toBe(originalObj.objProp);
  });

  it('Object property in Object property are not the exact same', () => {
    expect(obj.objProp.objProp).not.toBe(originalObj.objProp.objProp);
  });

  it('recursive object property are not the exact same', () => {
    expect(obj.recursiveProp).not.toBe(originalObj.recursiveProp);
  });

  it('recursive object property is the main object', () => {
    expect(obj.recursiveProp).toBe(obj);
  });
});
