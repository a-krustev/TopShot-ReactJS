import { Link } from "react-router-dom";
import { ContestThumb } from "./ContestThumb";
import { useEffect } from "react";
import { useContestContext } from "../../contexts/ContestContext";

export const Home = () => {
    const { latestContests, onGetLatestContests } = useContestContext();
    useEffect(() => {
        onGetLatestContests();
    }, []);
    
    return (
        <div>
            <div className="main-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="header-text">
                                <h2>
                                    Enter a world of <em>Photos</em> &amp;
                                    Amazing <em>Awards</em>
                                </h2>
                                <p>
                                    SnapX Photography is a professional website
                                    template with 5 different HTML pages for
                                    maximum customizations. It is free for
                                    commercial usage. This Bootstrap v5.1.3 CSS
                                    layout is provided by TemplateMo Free CSS
                                    Templates.
                                </p>
                                <div className="buttons">
                                    <div className="big-border-button">
                                        <Link
                                            to="/contests"
                                            onClick={() => {
                                                window.scroll(0, 0);
                                            }}
                                        >
                                            Explore SnapX Contest
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="featured-items" id="featured-items">
                <h3>Latest contests...</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="owl-features owl-carousel">
                                <div className="owl-stage-outer">
                                    <div className="owl-stage">
                                        {!latestContests ? (
                                            <h3>Contests loading...</h3>
                                        ) : latestContests.length === 0 ? (
                                            <h3>No contests yet</h3>
                                        ) : (
                                            latestContests &&
                                            latestContests.map((contest) => (
                                                <ContestThumb
                                                    {...contest}
                                                    key={contest._id}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
