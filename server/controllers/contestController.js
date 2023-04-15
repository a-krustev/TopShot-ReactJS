const { userModel, categoryModel, contestModel } = require("../models");
const { isOwner } = require("../utils/guard");

function newContest(contestData, authorId) {
    const title = contestData.contestTitle;
    const titleImg = contestData.titleImg;
    const category = contestData.category;
    const prize = contestData.prize;
    const startDate = contestData.startDate;
    const endDate = contestData.endDate;
    return contestModel.create({
        title,
        authorId,
        titleImg,
        category,
        prize,
        startDate,
        endDate,
    });
}

function getLatestsContests(req, res, next) {
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);
    const limit = Number(req.query.limit) || 0;
    contestModel
        .find({endDate: {
            $gt: endOfDay,
        }})
        .sort({ created_at: -1 })
        .limit(limit)
        .then((contests) => {
            res.status(200).json(contests);
        })
        .catch(next);
}

function getContest(req, res, next) {
    const { contestId } = req.params;

    contestModel
        .findById(contestId)
        .lean()
        .then((contest) => {
            getParticipants(contestId).then((participates) => {
                contest.participants = 0;
                participates.map((user) => {
                    if (user.contestsParticipates.includes(contestId))
                        contest.participants++;
                });
                res.status(200).json(contest);
            });
        })
        .catch(next);
}

function getParticipants(contestId) {
    return userModel.find().select("contestsParticipates");
}

function createContest(req, res, next) {
    const { _id: userId } = req.user;
    const contestData = req.body;

    newContest(contestData, userId)
        .then((contest) => {
            res.status(200).json(contest);
        })
        .catch(next);
}

function addPhoto(req, res, next) {
    const { _id: userId } = req.user;
    const contestId = req.body.id;
    const contestImg = req.body.contestImg;

    contestModel
        .updateOne(
            { _id: contestId },
            {
                $push: {
                    photos: {
                        photoUrl: contestImg,
                        photographer: userId,
                    },
                },
            }
        )
        .then(() => {
            userModel
                .findById(userId)
                .lean()
                .then((user) => {
                    if (
                        user.contestsParticipates.every(
                            (contest) => !contest.equals(contestId)
                        )
                    ) {
                        userModel
                            .updateOne(
                                { _id: userId },
                                {
                                    $push: {
                                        contestsParticipates: [contestId],
                                    },
                                }
                            )
                            .exec();
                    }
                });
        })
        .then((updatedContest) => {
            console.log(updatedContest);
            res.status(200).send({ message: "Photo added!" });
        })
        .catch(next);
}

function likePhoto(req, res, next) {
    const contestId = req.body.contestId;
    const photoId = req.body.photoId;
    const { _id: userId } = req.user;

    const query = { _id: contestId, "photos._id": photoId };
    const updateDocument = {
        $addToSet: { "photos.$.likes": userId },
    };
    contestModel
        .updateOne(query, updateDocument)
        .then(() => res.status(200).send({ message: "Liked successfully!" }))
        .catch(next);
}

function editContest(req, res, next) {
    const { contestId } = req.params;
    const { contestText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the contest, the contest will not be updated
    contestModel
        .findOneAndUpdate(
            { _id: contestId, userId },
            { text: contestText },
            { new: true }
        )
        .then((updatedContest) => {
            if (updatedContest) {
                res.status(200).json(updatedContest);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteContest(req, res, next) {
    const { contestId, themeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        contestModel.findOneAndDelete({ _id: contestId, userId }),
        userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { contests: contestId } }
        ),
        categoryModel.findOneAndUpdate(
            { _id: themeId },
            { $pull: { contests: contestId } }
        ),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { contestId } = req.params;
    const { _id: userId } = req.user;
    // console.log('contestsid: ', contestId);
    
    contestModel
    .updateOne(
        { _id: contestId },
        { $addToSet: { likes: userId } },
        { new: true }
        )
        .then(() => res.status(200).json({ message: "Liked successful!" }))
        .catch(next);
}

module.exports = {
    getLatestsContests,
    getContest,
    newContest,
    createContest,
    addPhoto,
    likePhoto,
    editContest,
    deleteContest,
    like,
};
