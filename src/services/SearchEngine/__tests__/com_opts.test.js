const COM_OPTS = require('../com_opts');

describe('Testing Comparison Operators of Search Engien', () => {

  /**
   * Testing equal operator
   */
  test('Equal Operator, 2 === 2', () => {
    expect(COM_OPTS.eq(2, 2)).toBeTruthy();
  });

  /**
   * Testing greater than operator
   */
  test('Greater Than Operator, 3 > 2', () => {
    expect(COM_OPTS.gt(3, 2)).toBeTruthy();
  });

  /**
   * Testing less than operator
   */
  test('Less Than Operator, 2 < 3', () => {
    expect(COM_OPTS.lt(2, 3)).toBeTruthy();
  });

  /**
   * Testing less than and greater aka between operator
   */
  test('Between Operator, 3 > 2 && 3 < 5 ', () => {
    expect(COM_OPTS.btw(3, 2, 5)).toBeTruthy();
  });

  /**
   * Testing less than or equal and greater than or equal aka between with equal operator
   */
  test('Between or Equal Operator, 2 >= 2 && 2 < 5 ', () => {
    expect(COM_OPTS.btwe(2, 2, 5)).toBeTruthy();
  });

  /**
   * Testing regex operator
   */
  test('Regex Operator', () => {
    expect(
      COM_OPTS.regex(
        'Hotel One',
        'one'
      )
    ).toBeTruthy();
  });


});