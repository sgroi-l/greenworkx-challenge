const getTopCareerMatches = require('./main');
const jobData = require('./roleData');

describe('getTopCareerMatches', () => {
  it('should return top career matches for user data', () => {
    const userData = {
      outdoorsExtent: 1,
      handsOnExtent: 1,
      technologyExtent: 1,
      salary: 40000,
    };

    const expectedMatches = [
      { name: 'Retrofit Assessor', score: 0.5 },
      { name: 'Forester', score: -3.5 },
      { name: 'Solar Panel Installer', score: -5.3 },
    ];

    const matches = getTopCareerMatches(userData, jobData);
    expect(matches).toEqual(expectedMatches);
  });

  it('should return top matches for high-salary and willingness user data', () => {
    const userData = {
      outdoorsExtent: 5,
      handsOnExtent: 5,
      technologyExtent: 5,
      salary: 80000,
    };

    const expectedMatches = [
      { name: 'Solar Panel Installer', score: expect.any(Number) },
      { name: 'Heat Pump Engineer', score: expect.any(Number) },
      { name: 'EV Chargepoint Installer', score: expect.any(Number) },
    ];

    const matches = getTopCareerMatches(userData, jobData);
    expect(matches).toEqual(expectedMatches);
  });

  it('should return an array of length 3', () => {
    const userData = {
      outdoorsExtent: 5,
      handsOnExtent: 5,
      technologyExtent: 5,
      salary: 80000,
    };
    const matches = getTopCareerMatches(userData, jobData);
    expect(matches).toHaveLength(3);
  });
});
