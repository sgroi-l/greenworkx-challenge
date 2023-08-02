FUNCTION normaliseUserInput(user_data)
normalised_user_data = COPY OF user_data

    // normalise user data from the range 1 to 5 to the range -1 to 1
    normalised_user_data.outdoorsExtent = (user_data.outdoorsExtent - 3) / 2
    normalised_user_data.handsOnExtent = (user_data.handsOnExtent - 3) / 2
    normalised_user_data.technologyExtent = (user_data.technologyExtent - 3) / 2

    RETURN normalised_user_data

END FUNCTION

FUNCTION calculateMatchScore(user_data, job)
match_score = 0

    IF user_data.outdoorsExtent >= job.outdoorsExtent
        match_score += 1
    ELSE
        match_score += (user_data.outdoorsExtent - job.outdoorsExtent)

    IF user_data.handsOnExtent >= job.handsOnExtent
        match_score += 1
    ELSE
        match_score += (user_data.handsOnExtent - job.handsOnExtent)

    IF user_data.technologyExtent >= job.technologyExtent
        match_score += 1
    ELSE
        match_score += (user_data.technologyExtent - job.technologyExtent)


    /// Adjust the salary match score based on the user's desired salary and job's salary range
    IF user_data.desiredSalary < job.salaryRange.low
        match_score += 1.5
    ELSE IF user_data.desiredSalary < job.salaryRange.medium
        match_score += 0.5
    ELSE IF user_data.desiredSalary > job.salaryRange.high
        match_score -= 1.5
    ELSE
        match_score -= 0.5

    RETURN match_score

END FUNCTION

FUNCTION findTopCareerMatches(user_data, job_data)
normalised_user_data = normaliseUserInput(user_data)
matches = EMPTY LIST

    FOR each job in job_data
        match_score = calculateMatchScore(normalised_user_data, job)

        IF length(matches) < 3
            matches.append((job.name, match_score))
        ELSE IF match_score > lowest_match_score(matches)
            remove lowest_match_score(matches)
            matches.append((job.name, match_score))

    SORT matches by descending match_score

    RETURN matches

END FUNCTION
