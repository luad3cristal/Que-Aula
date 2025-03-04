import Reset from "../../assets/refresh.svg";
import ArrowDown from "../../assets/arrow-down.svg";

import "./headerStyle.scss";

import { useState } from "react";
import { IDropdown, IHeader } from "./header.interface";

const Header = ({ switchWeekday, weekDays }: IHeader) => {
  const [navSwitch, setNavSwitch] = useState(false);

  return (
    <header className="header">
      <section className="header__title" onClick={() => setNavSwitch(false)}>
        <h1>Que Aula?</h1>
        <figure className="header__reset" onClick={() => location.reload()}>
          <img src={Reset} alt="reset" />
        </figure>
      </section>
      <DropDown
        setNavSwitch={setNavSwitch}
        switchWeekday={switchWeekday}
        dropdownItems={weekDays}
        navSwitch={navSwitch}
      />
    </header>
  );
};

function DropDown({ setNavSwitch, switchWeekday, dropdownItems, navSwitch }: IDropdown) {
  const navButtonClass = navSwitch ? "header__dropDown__button--focus" : "";
  const navButtonClassIcon = navSwitch ? "header__dropDown__button__icon--focus" : "";

  return (
    <nav className="header__dropDown" onClick={() => setNavSwitch((prev) => !prev)}>
      <button className={`header__dropDown__button ${navButtonClass}`}>
        <h4 className="header__dropDown__button__text">Dias da Semana</h4>
        <img
          src={ArrowDown}
          alt="open-dropdown"
          className={`header__dropDown__button__icon ${navButtonClassIcon}`}
        />
      </button>

      {navSwitch &&
        dropdownItems.map((item, index) => (
          <div
            onClick={() => switchWeekday(index + 1)}
            className="header__dropDown-item"
            key={index}
          >
            <h3 className="header__dropDown-item__text">{item}</h3>
          </div>
        ))}
    </nav>
  );
}

export default Header;
