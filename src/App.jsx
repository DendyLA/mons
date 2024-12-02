import { useState, useEffect, useCallback } from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import SubMain from "./components/subMain/subMain";
import Info from "./components/info/info";
import Projects from "./components/projects/projects";
import Team from "./components/team/team";
import "./App.css";

function App() {
    const [currentSection, setCurrentSection] = useState(0); // Индекс текущей секции
    const [isPageLoaded, setIsPageLoaded] = useState(false); // Флаг загрузки страницы
    const [visibleSection, setVisibleSection] = useState(null); // Для задержки отображения контента
    const [currentItem, setCurrentItem] = useState(0); // Текущий элемент из Info

    let isThrottling = false; // Флаг для троттлинга

    const sections = [
        { className: "view__one", content: [<Main />] },
        { className: "view__two", content: [<SubMain />] },
        { className: "view__three", content: [<Info currentItem={currentItem} setCurrentItem={setCurrentItem} />] },
        {
            className: "view__four",
            content: [
                <div className="projects">
                    <div className="container">
                        <div className="projects__wrapper">
                            <div className="projects__first">
                                <h2 className="projects__title" id="projects">
                                    наши кейсы
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>,
            ],
        },
        { className: "view__five", content: [<Projects />] },
        {
            className: "view__six",
            content: [
                <section className="team">
                    <div className="container">
                        <div className="team__wrapper row">
                            <h3 className="team__title col-4 offset-4">
                                Познакомьтесь с нашей командой
                            </h3>
                        </div>
                    </div>
                </section>,
            ],
        },
        { className: "view__seven", content: [<Team />] },
    ];

    const handleWheel = useCallback(
        (e) => {
            if (isThrottling || !isPageLoaded) {
                e.preventDefault(); // Игнорируем события, если throttling включён или страница не загружена
                return;
            }

            // Устанавливаем флаг троттлинга
            isThrottling = true;
            setTimeout(() => {
                isThrottling = false; // Сбрасываем троттлинг через 1.5 секунды
            }, 1500);

            // Прокрутка вниз
            if (e.deltaY > 0) {
                setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
            } else {
                // Прокрутка вверх
                setCurrentSection((prev) => Math.max(prev - 1, 0));
            }

            e.preventDefault();
        },
        [isPageLoaded, sections.length]
    );

    useEffect(() => {
        const wrapper = document.querySelector(".page__wrapper");

        // Отслеживаем загрузку страницы
        window.addEventListener("load", () => {
            setIsPageLoaded(true);
            setCurrentSection(0); // Устанавливаем начальную позицию секции при загрузке
        });

        // Добавляем событие для колесика
        wrapper.addEventListener("wheel", handleWheel, { passive: false });

        // Убираем обработчик событий при размонтировании компонента
        return () => {
            wrapper.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibleSection(currentSection);
        }, 800);

        return () => clearTimeout(timeout);
    }, [currentSection]);

    return (
        <div className="page">
            <Header currentSection={currentSection} />
            <div
                className="page__wrapper"
                style={{
                    transform: `translateY(-${currentSection * 100}vh)`,
                    transition: "transform 2s ease",
                }}
            >
                <div className="noise"></div>
                {sections.map((section, index) => (
                    <div key={index} className={`view ${section.className}`}>
                        {["view__two", "view__six", "view__seven"].includes(section.className) ? (
                            <div className="noise"></div>
                        ) : (
                            ""
                        )}
                        {section.content.map((content, i) => (
                            <div
                                key={i}
                                className="content__wrapper"
                                style={{
                                    opacity: visibleSection === index ? 1 : 0,
                                    transform:
                                        visibleSection === index ? "translateY(0)" : "translateY(20px)",
                                    transition: "opacity 1s ease, transform 0.8s ease",
                                }}
                            >
                                {content}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
