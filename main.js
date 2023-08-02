const roleData = require('./roleData');

// Function to normalise the user input to a standardised range
function normaliseUserInput(userData) {
  // Deep copy user_data object
  const normalisedUserData = JSON.parse(JSON.stringify(userData));

  normalisedUserData.outdoorsExtent = (userData.outdoorsExtent - 3) / 2;
  normalisedUserData.handsOnExtent = (userData.handsOnExtent - 3) / 2;
  normalisedUserData.technologyExtent = (userData.technologyExtent - 3) / 2;

  return normalisedUserData;
}

// Function to calculate the match score between user preferences and a job
function calculateMatchScore(userData, job) {
  let matchScore = 0;

  if (userData.outdoorsExtent >= job.outdoorsExtent) {
    matchScore += 1;
  } else {
    matchScore += userData.outdoorsExtent - job.outdoorsExtent;
  }

  if (userData.handsOnExtent >= job.handsOnExtent) {
    matchScore += 1;
  } else {
    matchScore += userData.handsOnExtent - job.handsOnExtent;
  }

  if (userData.technologyExtent >= job.technologyExtent) {
    matchScore += 1;
  } else {
    matchScore += userData.technologyExtent - job.technologyExtent;
  }

  // Adjust the match score based on the user's desired salary and job's salary range

  if (userData.salary < job.salaryRange.low) {
    matchScore += 1.5;
  } else if (userData.salary < job.salaryRange.medium) {
    matchScore += 0.5;
  } else if (userData.salary > job.salaryRange.high) {
    matchScore -= 1.5;
  } else {
    matchScore -= 0.5;
  }

  return matchScore;
}

// Function to get the top career matches based on user preferences and job data
function getTopCareerMatches(userData, jobData) {
  const normalisedUserData = normaliseUserInput(userData);

  // Array to store the job matches
  const matches = [];

  // Iterate through each job in the job data
  jobData.forEach((job) => {
    // Calculate the match score for the current job
    const matchScore = calculateMatchScore(normalisedUserData, job);

    // Add the job and its match score to the matches array if it has less than 3 matches
    if (matches.length < 3) {
      matches.push({ name: job.name, score: matchScore });
    } else {
      // If the matches array already has 3 matches, find the index of the lowest match score
      const lowestMatchIndex = matches.findIndex(
        (item) =>
          // eslint-disable-next-line
          item.score ===
          Math.min(...matches.map((matchitem) => matchitem.score)),
      );
      // Replace the lowest match score with the current job if its match score is higher
      if (matchScore > matches[lowestMatchIndex]?.score) {
        matches.splice(lowestMatchIndex, 1, {
          name: job.name,
          score: matchScore,
        });
      }
    }
  });

  // Sort the matches array in descending order of match score and return it
  return matches.sort((a, b) => b.score - a.score);
}

// Example user data
const laurie = {
  outdoorsExtent: 5,
  handsOnExtent: 4,
  technologyExtent: 3,
  salary: 20999,
};

console.log(getTopCareerMatches(laurie, roleData));
console.log(normaliseUserInput(laurie));

module.exports = getTopCareerMatches;
