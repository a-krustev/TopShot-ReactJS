import { useEffect } from "react";
import { useContestContext } from "../../contexts/ContestContext";
import { CategoryContestThumb } from "./CategoryContestThumb/CategoryContestThumb";
import './categories.css'


export const Categories = () => {
    const { categories, popularContests, onGetCategories } = useContestContext();

    useEffect(() => {
        onGetCategories();
    }, []);
   
    return (
        <>
            <div className="page-heading">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 header-text">
                            <h2>
                                Discover Most Popular Categories on{" "}
                                <em>TopShot</em>
                            </h2>
                            <p>Check out our contest categories.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-categories">
                <div className="container">
                    <div className="row">
                        <div className="col-lg col-sm-4">
                            <div className="item">
                                <div className="icon">
                                    <img
                                        src={require('../../assets/images/icon-01.png')}
                                        alt=""
                                    />
                                </div>
                                <h4>Nature</h4>
                                <span>Available Contests</span>
                                <span className="counter">
                                    {categories.natureContests}
                                </span>
                            </div>
                        </div>
                        <div className="col-lg col-sm-4">
                            <div className="item">
                                <div className="icon">
                                    <img
                                        src={require('../../assets/images/icon-02.png')}
                                        alt=""
                                    />
                                </div>
                                <h4>Architecture</h4>
                                <span>Available Contests</span>
                                <span className="counter">
                                    {categories.architectureContests}
                                </span>
                            </div>
                        </div>
                        <div className="col-lg col-sm-4">
                            <div className="item">
                                <div className="icon">
                                    <img
                                        src={require('../../assets/images/icon-03.png')}
                                        alt=""
                                    />
                                </div>
                                <h4>Portrait</h4>
                                <span>Available Contests</span>
                                <span className="counter">
                                    {categories.portraitContests}
                                </span>
                            </div>
                        </div>
                        <div className="col-lg col-sm-4">
                            <div className="item">
                                <div className="icon">
                                    <img
                                        src={require('../../assets/images/icon-04.png')}
                                        alt=""
                                    />
                                </div>
                                <h4>Sport</h4>
                                <span>Available Contests</span>
                                <span className="counter">{categories.sportContests}</span>
                            </div>
                        </div>
                        <div className="col-lg col-sm-4">
                            <div className="item">
                                <div className="icon">
                                    <img
                                        src={require('../../assets/images/icon-01.png')}
                                        alt=""
                                    />
                                </div>
                                <h4>Macro</h4>
                                <span>Available Contests</span>
                                <span className="counter">{categories.macroContests}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="featured-contests">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading text-center">
                                <h6>Featured Contests</h6>
                                <h4>
                                    View Most Popular <em>Contests</em>
                                </h4>
                            </div>
                        </div>
                        {popularContests.map(contest => <CategoryContestThumb key={contest._id} {...contest} />)}
                    </div>
                </div>
            </section>
        </>
    );
};
