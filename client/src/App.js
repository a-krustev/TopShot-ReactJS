import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ContestProvider } from "./contexts/ContestContext";

import { PopupMsg } from "./components/Popup/Popup";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Contests } from "./components/Contests/Contests";
import { AddPhoto } from "./components/Contests/Contest/AddPhoto/AddPhoto";
import { Categories } from "./components/Categories/Categories";
import { Login } from "./components/Auth/Login/Login";
import { Register } from "./components/Auth/Register/Register";
import { Profile } from "./components/Auth/Profile/Profile";
import { ContestDetails } from "./components/Contests/Contest/ContestDetails/ContestDetails";
import { Logout } from "./components/Auth/Logout";
import { NewContest } from "./components/Contests/Contest/NewContest/NewContest";
import "./assets/css/templatemo-snapx-photography.css";
import "./assets/css/animate.css";
import "./assets/css/owl.css";
import "./assets/css/flex-slider.css";
import "./assets/css/fontawesome.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/popup.css";
import { AuthGuard } from "./components/common/AuthGuard";
import { GuestGuard } from "./components/common/GuestGuard";
import { ContestCreator } from "./components/common/ContestCreator";
import { EditContest } from "./components/Contests/Contest/EditContest";

function App() {
    return (
        <AuthProvider>
            <ContestProvider>
                <PopupMsg />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contests" element={<Contests />} />
                    <Route
                        path="/contests/:contestId"
                        element={<ContestDetails />}
                    />
                    <Route path="/categories" element={<Categories />} />
                    <Route element={<GuestGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/new-contest" element={<NewContest />} />
                        <Route
                            path="/contests/:contestId/add-photo"
                            element={
                                <ContestCreator>
                                    <AddPhoto />
                                </ContestCreator>
                            }
                        />
                        <Route
                            path="/contests/:contestId/edit"
                            element={
                                <ContestCreator>
                                    <EditContest />
                                </ContestCreator>
                            }
                        />
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                </Routes>
                <Footer />
            </ContestProvider>
        </AuthProvider>
    );
}

export default App;
