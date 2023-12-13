import { Contest } from "./Contest/Contest";
import { useContestContext } from "../../contexts/ContestContext";
import './contests.css'

export const Contests = () => {
    const { contests } = useContestContext();

    return (
        <section className="photos-videos">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-heading text-center">
                            <h6>Photos &amp; Videos At TopShot</h6>
                            <h4>
                                Our Featured <em>Photos &amp; Videos</em> At
                                SnapX
                            </h4>
                        </div>
                    </div>
                    {!contests ? (
                        <h3>Contests loading...</h3>
                    ) : contests.length === 0 ? (
                        <h3>No contests yet</h3>
                    ) : (
                        contests &&
                        contests.map((contest) => (
                            <Contest key={contest._id} {...contest} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};
