import { Fragment, useEffect } from "react";
import "./modalStyle.scss";
import Data from "../../data/classes.json";
import { IModal } from "./modal.Interface";
import { IClassesData } from "../../types/dataClasses.interface";

const Modal = ({ isModalOpen }: IModal) => {
  const classesData: IClassesData[] = Data;

  useEffect(() => {
    classesData.forEach((e) => {
      e.classes.forEach((item) => {
        item.selected = false;
      });
    });
  });

  const selectClass = (e: React.MouseEvent<HTMLElement>, item: IClassesData) => {
    e.currentTarget.classList.toggle("class-tags--selected");

    if (!item.multiClass) {
      item.classes.forEach((element) => {
        element.selected = !element.selected;
      });
    } else {
      const whichClass = e.currentTarget.innerText
        .slice(e.currentTarget.innerText.lastIndexOf(" "))
        .trim();

      item.classes.forEach((element) => {
        if (element.whichClass === whichClass) {
          element.selected = !element.selected;
        }
      });
    }
  };

  const submitCalendar = () => {
    const selecionados: IClassesData[] = [];

    classesData.forEach((e) => {
      e.classes.forEach((f) => {
        if (f.selected && !selecionados.includes(e)) selecionados.push(e);
      });
    });

    selecionados.forEach((e) => {
      e.classes.forEach((item) => {
        item.className = e.name;
        item.classDescription = e.description;
      });
    });

    localStorage.setItem("chosenClasses", JSON.stringify(selecionados));
    location.reload();
  };

  const semestres = [
    "Optativas",
    "1º Semestre",
    "2º Semestre",
    "3º Semestre",
    "4º Semestre",
    "5º Semestre",
    "6º Semestre",
  ];

  return (
    <>
      <div className={`modal modal--${isModalOpen ? "open" : "closed"}`}>
        <div className="modal__container">
          <div>
            <h2>
              Bem vindo ao <span className="modal-title">Que Aula?</span>
            </h2>
            <p>
              Um site desenvolvido para ajudar com a bagunça que são as aulas do IFBA. Lhe
              informando suas aulas atualizadas diariamente e um calendário relativo a sua rotina.
            </p>
            <h4 className="modal__warning">
              Passando por atualizações. Talvez seu calendário seja resetado.
            </h4>
          </div>
          <div>
            <h3>Escolha as suas matérias</h3>
            {semestres.map((e, i) => (
              <Fragment key={i}>
                <h4>{e}</h4>
                <div className="class-tags-container">
                  {classesData
                    .filter((e) => +e.semester === i)
                    .map((item) =>
                      !item.multiClass ? (
                        <div
                          className="class-tags"
                          onClick={(e) => selectClass(e, item)}
                          key={item.description}
                        >
                          {item.name}
                        </div>
                      ) : (
                        item.classList &&
                        item.classList.map((classInfo) => (
                          <div
                            className="class-tags"
                            onClick={(e) => selectClass(e, item)}
                            key={classInfo}
                          >
                            {item.name} {classInfo}
                          </div>
                        ))
                      )
                    )}
                </div>
              </Fragment>
            ))}
          </div>
          <button className="generate-calendar" onClick={() => submitCalendar()}>
            Gerar Calendario
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
