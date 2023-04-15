import "./App.css";
import { Routes, Route } from "react-router-dom";

import { PopupMsg } from "./components/Popup/Popup";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home/Home";
import { Contests } from "./components/Contests/Contests";
import { AddPhoto } from "./components/Contests/Contest/AddPhoto/AddPhoto";
import { Categories } from "./components/Categories/Categories";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Profile } from "./components/Auth/Profile";
import { ContestDetails } from "./components/Contests/Contest/ContestDetails/ContestDetails";
import { Logout } from "./components/Auth/Logout";
import { NewContest } from "./components/Contests/Contest/NewContest";
import { AuthProvider } from "./contexts/AuthContext";
import { ContestProvider } from "./contexts/ContestContext";
import "./assets/css/templatemo-snapx-photography.css";
import "./assets/css/animate.css";
import "./assets/css/owl.css";
import "./assets/css/flex-slider.css";
import "./assets/css/fontawesome.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/popup.css";

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
                    <Route
                        path="/contests/:contestId/add-photo"
                        element={<AddPhoto />}
                    />
                    <Route
                        path="/categories"
                        element={<Categories />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/new-contest" element={<NewContest />} />
                </Routes>
                <Footer />
            </ContestProvider>
        </AuthProvider>
    );
}

export default App;
