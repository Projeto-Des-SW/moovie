import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import PrivateRoute from "./private-routes/PrivateRoute.tsx";
import Approved from "./pages/Login/approved.tsx";
import Movie from "./pages/Movies/movie.tsx";
import Series from "./pages/TvShows/Series.tsx";
import RatedMovies from "./pages/RatedMovies";
import Season from "./pages/TvShows/Season.tsx";
import Loading from "./components/UI/Loading.tsx";
import RatedTvShows from "./pages/RatedTvShows";
import RatedEpisodes from "./pages/RatedEpisodes";

function App() {
    return (
        <>
            <Loading/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/approved" element={<Approved/>}/>
                    <Route path="/" element={<PrivateRoute component={Home}/>}/>
                    <Route path="/tvshows" element={<PrivateRoute component={TvShows}/>}/>
                    <Route path="/tvshow/:id" element={<PrivateRoute component={Series}/>}/>
                    <Route path="/tvshow/:id/season/:season_number" element={<PrivateRoute component={Season}/>}/>
                    <Route path="/movies" element={<PrivateRoute component={Movies}/>}/>
                    <Route path="/movie/:id" element={<PrivateRoute component={Movie}/>}/>
                    <Route path="/collections" element={<PrivateRoute component={Collections}/>}/>
                    <Route path="/search" element={<PrivateRoute component={Search}/>}/>
                    <Route path="/mylist" element={<PrivateRoute component={MyList}/>}/>
                    <Route path="/ratedmovies" element={<PrivateRoute component={RatedMovies}/>}/>
                    <Route path="/ratedtvshows" element={<PrivateRoute component={RatedTvShows}/>}/>
                    <Route path="/ratedepisodes" element={<PrivateRoute component={RatedEpisodes}/>}/>
                    <Route path="/search" element={<PrivateRoute component={Search}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
