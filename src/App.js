import LoginForm from "./components/LoginForm";
import AdminPanel from "./components/AdminPanel";
import {useState} from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    // put smooth transitions on everything in the app
    <div id='App' className="bg-gray-800">
      {!isLoggedIn && <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && <AdminPanel/>}
    </div>
  );
}

export default App;
