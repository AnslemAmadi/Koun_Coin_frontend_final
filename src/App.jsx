import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import MainApp from './components/MainApp';
import Avatapg from './page/Avatapg';
import Boostpg from './page/Boostpg';
import Airdropg from './page/Airdropg';
import Homepg from './page/Homepg';
import Earnpg from './page/Earnpg';
import Invitepg from './page/Invitepg';
import Statspg from './page/Statspg';
import Gamepg from './page/Gamepg';
import { CoinProvider } from './components/data/Coincontext';
import Navigation from './components/Navigation';
import Pagewrapper from './page/Pagewrapper';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000); // 4 seconds
  }, []);

  return (
    <CoinProvider>
      <Router>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div> {/* Scrollable content area */}
                <Routes>
                  <Route path="/" element={<Pagewrapper className="home"><MainApp /></Pagewrapper>} />
                  <Route path="/avatabtn" element={<Pagewrapper className="avata"><Avatapg /></Pagewrapper>} />
                  <Route path="/boost" element={<Pagewrapper className="boost"><Boostpg /></Pagewrapper>} />
                  <Route path="/airdropbtn" element={<Pagewrapper className="airdrop"><Airdropg /></Pagewrapper>} />
                  <Route path="/homepg" element={<Homepg />} />
                  <Route path="/earnbtn" element={<Pagewrapper className="earn"><Earnpg /></Pagewrapper>} />
                  <Route path="/invitebtn" element={<Pagewrapper className="invite"><Invitepg /></Pagewrapper>} />
                  <Route path="/statsbtn" element={<Pagewrapper className="stats"><Statspg /></Pagewrapper>} />
                  <Route path="/gamebtn" element={<Gamepg />} />
                </Routes>
              </div>
              <div className="navigation"> {/* Fixed navigation bar at the bottom */}
                <Navigation />
              </div>
            </>
          )}
        </div>
      </Router>
    </CoinProvider>
  );
};

export default App;
