import LoginForm from "./components/LoginForm";
import AdminPanel from "./components/AdminPanel";
import {useState} from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="bg-gray-800 w-screen h-screen">
      {!isLoggedIn && <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && <AdminPanel/>}
    </div>
  );
}

export default App;
