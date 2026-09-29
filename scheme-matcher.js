(function(window) {
    'use strict';

    function calculateAge(dob) {
        const birthDate = new Date(`${dob}T00:00:00`);
        if (Number.isNaN(birthDate.getTime())) return 18;

        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear() -
            ((today.getMonth() < birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) ? 1 : 0);
    }

    function normalize(value) {
        return String(value === null || value === undefined ? '' : value)
            .trim()
            .toLowerCase()
            .replace(/\s*\([^)]*\)/g, '')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    function evaluate(profile, scheme) {
        const eligibility = scheme.eligibility || {};
        const checks = [];
        const matchedReasons = [];
        const missingReasons = [];
        let passedWeight = 0;
        let totalWeight = 0;

        function addCheck(name, weight, passed, detail) {
            totalWeight += weight;
            if (passed) {
                passedWeight += weight;
                matchedReasons.push(detail);
            } else {
                missingReasons.push(detail);
            }
            checks.push({ name, weight, passed, detail });
        }

        const profileTypes = Array.isArray(profile.disabilityTypes) ? profile.disabilityTypes : [];
        const schemeTypes = Array.isArray(eligibility.disabilityTypes) ? eligibility.disabilityTypes : [];
        const hasNoDisability = profileTypes.includes('none') || profileTypes.length === 0;
        const minimumPercent = Number(eligibility.disabilityPercentMin === null || eligibility.disabilityPercentMin === undefined ? 40 : eligibility.disabilityPercentMin);
        const matchedTypes = profileTypes.filter(type => schemeTypes.includes(type));
        const typePassed = hasNoDisability ? minimumPercent === 0 : matchedTypes.length > 0;
        addCheck(
            'Disability type',
            30,
            typePassed,
            typePassed ? 'Disability category matches scheme criteria' : 'Disability category is not covered by this scheme'
        );

        const percent = Number(profile.disabilityPercent || 0);
        const percentPassed = percent >= minimumPercent;
        addCheck(
            'Disability percentage',
            20,
            percentPassed,
            percentPassed ? `Disability percentage meets the ${minimumPercent}% minimum` : `Requires at least ${minimumPercent}% disability`
        );

        const allowedEducation = eligibility.educationLevels === null || eligibility.educationLevels === undefined ? 'all' : eligibility.educationLevels;
        const educationPassed = allowedEducation === 'all' ||
            (Array.isArray(allowedEducation) && allowedEducation.includes(profile.educationLevel));
        addCheck(
            'Education level',
            15,
            educationPassed,
            educationPassed ? 'Education level is covered' : 'Education level does not match scheme criteria'
        );

        const maximumIncome = Number(eligibility.maxIncome === null || eligibility.maxIncome === undefined ? 9999999 : eligibility.maxIncome);
        const income = Number(profile.householdIncome || 0);
        const incomePassed = income <= maximumIncome;
        addCheck(
            'Household income',
            15,
            incomePassed,
            incomePassed ? 'Household income is within the scheme limit' : `Household income exceeds the Rs ${maximumIncome.toLocaleString('en-IN')} limit`
        );

        const ageRange = Array.isArray(eligibility.ageRange) ? eligibility.ageRange : [0, 99];
        const age = Number(profile.age === null || profile.age === undefined ? calculateAge(profile.dob) : profile.age);
        const agePassed = age >= Number(ageRange[0] === null || ageRange[0] === undefined ? 0 : ageRange[0]) &&
            age <= Number(ageRange[1] === null || ageRange[1] === undefined ? 99 : ageRange[1]);
        addCheck(
            'Age range',
            10,
            agePassed,
            agePassed ? 'Age is within the eligible range' : `Age must be between ${ageRange[0]} and ${ageRange[1]} years`
        );

        const requiredGender = normalize(eligibility.gender || 'all');
        const genderPassed = requiredGender === 'all' || requiredGender === normalize(profile.gender);
        addCheck(
            'Gender',
            5,
            genderPassed,
            genderPassed ? 'Gender criteria are met' : `Scheme is limited to ${eligibility.gender} applicants`
        );

        const allowedStates = eligibility.states === null || eligibility.states === undefined ? 'all' : eligibility.states;
        const statePassed = allowedStates === 'all' ||
            (Array.isArray(allowedStates) && allowedStates.some(state => normalize(state) === normalize(profile.state)));
        addCheck(
            'State coverage',
            5,
            statePassed,
            statePassed ? 'Applicant state is covered' : 'Scheme is not available in the applicant state'
        );

        const score = totalWeight ? Math.round((passedWeight / totalWeight) * 100) : 0;
        const isEligible = checks.every(check => check.passed);
        let status = score >= 85 ? 'highly-eligible' : score >= 65 ? 'likely-eligible' : score >= 40 ? 'partially-eligible' : 'low-match';
        if (!isEligible && score >= 40) status = 'partially-eligible';

        const today = new Date();
        const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        const deadlineUtc = scheme.deadline ? Date.parse(`${scheme.deadline}T00:00:00Z`) : NaN;
        const daysToDeadline = Number.isNaN(deadlineUtc) ? 0 : Math.ceil((deadlineUtc - todayUtc) / 86400000);

        return {
            scheme,
            score,
            status,
            isEligible,
            isAlmostEligible: !isEligible && score >= 60 && score < 85,
            checks,
            matchedReasons,
            missingReasons,
            daysToDeadline,
            isUrgent: daysToDeadline > 0 && daysToDeadline <= 60,
            requiredDocuments: scheme.requiredDocuments || []
        };
    }

    const SamarthyaMatcher = {
        calculateAge,

        match(profile, schemes) {
            return (schemes || [])
                .map(scheme => evaluate(profile, scheme))
                .filter(result => result.score > 0)
                .sort((left, right) => right.score - left.score);
        },

        getStats(results) {
            const schemes = results || [];
            const categories = {};
            schemes.forEach(result => {
                const category = result.scheme.category;
                categories[category] = (categories[category] || 0) + 1;
            });
            return {
                total: schemes.length,
                highlyEligible: schemes.filter(result => result.status === 'highly-eligible').length,
                likelyEligible: schemes.filter(result => result.status === 'likely-eligible').length,
                partiallyEligible: schemes.filter(result => result.status === 'partially-eligible').length,
                urgent: schemes.filter(result => result.isUrgent).length,
                avgScore: schemes.length ? (schemes.reduce((sum, result) => sum + result.score, 0) / schemes.length).toFixed(1) : '0.0',
                categories
            };
        }
    };

    window.SamarthyaMatcher = SamarthyaMatcher;
    window.LabhsetuMatcher = SamarthyaMatcher;
})(window);