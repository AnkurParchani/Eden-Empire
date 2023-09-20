import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SideNav, { NavItem, NavIcon } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, showLogout } from "../auth/authSlice";

// For each fontawesome icon of navigation
function NavigationIcon({ iconClass, currentActive, clickedActive }) {
  return (
    <i
      className={`${iconClass} mt-2  text-xl`}
      style={{
        color: currentActive === clickedActive ? "white" : "gray",
      }}
    />
  );
}

export default function MySideNav() {
  // To track the active link
  const [currentActive, setCurrentActive] = useState("home");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <SideNav
        onSelect={(selected) => {
          navigate(`${selected}`);
        }}
        className="fixed z-10 bg-pink-700"
      >
        <img
          src="/logo-imgs/logo-no-background.png"
          className="mx-auto mb-6 mt-4 h-10 rounded-full"
        />
        <SideNav.Nav defaultSelected={`${location.pathname}`}>
          {/* Home button */}
          <NavItem eventKey="/" onClick={() => setCurrentActive("home")}>
            <NavIcon>
              <NavigationIcon
                iconClass="fa-solid fa-house"
                currentActive={currentActive}
                clickedActive="home"
              />
            </NavIcon>
          </NavItem>

          {/* Settings button */}
          <NavItem
            eventKey="/my-profile"
            onClick={() => setCurrentActive("myProfile")}
          >
            <NavIcon>
              <NavigationIcon
                iconClass="fa-solid fa-user"
                currentActive={currentActive}
                clickedActive="myProfile"
              />
            </NavIcon>
          </NavItem>

          {/* Settings button */}
          <NavItem
            eventKey="/settings"
            onClick={() => setCurrentActive("settings")}
          >
            <NavIcon>
              <NavigationIcon
                iconClass="fa-solid fa-gear"
                currentActive={currentActive}
                clickedActive="settings"
              />
            </NavIcon>
          </NavItem>

          {/* Admin panel button */}
          <NavItem
            eventKey="/admin-panel"
            onClick={() => setCurrentActive("admin-panel")}
          >
            <NavIcon>
              <NavigationIcon
                iconClass="fa-solid fa-lock"
                currentActive={currentActive}
                clickedActive="admin-panel"
              />
            </NavIcon>
          </NavItem>

          {/* Logout button */}
          {isLoggedIn && (
            <NavItem
              disabled
              style={{ marginTop: "300px" }}
              onClick={() => dispatch(showLogout(true))}
            >
              <NavIcon>
                <NavigationIcon
                  iconClass="fa-solid fa-right-from-bracket"
                  currentActive={currentActive}
                  clickedActive="logout"
                />
              </NavIcon>
            </NavItem>
          )}

          {/* login button */}
          {!isLoggedIn && (
            <NavItem
              eventKey="/login"
              onClick={() => setCurrentActive("login")}
              style={{ marginTop: "300px" }}
            >
              <NavIcon>
                <NavigationIcon
                  iconClass="fa-solid fa-right-to-bracket"
                  currentActive={currentActive}
                  clickedActive="login"
                />
              </NavIcon>
            </NavItem>
          )}
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}
