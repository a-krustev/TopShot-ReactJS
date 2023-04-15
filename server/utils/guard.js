function isOwner(contestId, userId) {
    if (userId == contestId) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isOwner,
};
