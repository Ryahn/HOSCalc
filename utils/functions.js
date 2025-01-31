/**
 * @param {boolean} dateOnly - Whether to return only the date part of the timestamp
 * @param {number} days - Number of days to add to the current date
 * @returns {string} - MySQL safe timestamp
 */
function mysqlSafeTimestamp(dateOnly = false, days) {
    if (dateOnly && days) {
        return new Date(new Date().setDate(new Date().getDate() + days)).toISOString().split('T')[0];
    }

    if (days) {
        return new Date(new Date().setDate(new Date().getDate() + days)).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
    }

    if (dateOnly) {
        return new Date().toISOString().split('T')[0];
    }

    return new Date().toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
}

module.exports = {
    mysqlSafeTimestamp
};