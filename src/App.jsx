import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState("");

  // update Title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        ReleaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { Title: updatedTitle });
  };

  useEffect(() => {
    const getMovieList = async () => {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    };
    getMovieList();
  }, [onSubmitMovie]);

  return (
    <div classsName="App">
      <Auth />

      <div>
        <input
          placeholder="movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Recieved an oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.Title}
            </h1>
            <p> Date: {movie.ReleaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>delete Movie</button>
            <input
              placeholder="new title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              {""} update Title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
import { useEffect } from "react";
import { use } from "react";
