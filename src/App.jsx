import { useState, useEffect, useCallback } from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import SubMain from "./components/subMain/subMain";
import Info from "./components/info/info";
import Projects from "./components/projects/projects";
import Team from "./components/team/team";
import Form from "./components/form/form";
import "./App.css";

function App() {
    const [currentSection, setCurrentSection] = useState(0); // Индекс текущей секции
    const [isPageLoaded, setIsPageLoaded] = useState(false); // Флаг загрузки страницы
    const [visibleSection, setVisibleSection] = useState(null); // Для задержки отображения контента
    const [currentItemInfo, setCurrentItemInfo] = useState(0); // Текущий элемент из Info

    let isThrottling = false; // Флаг для троттлинга

    const sections = [
        { className: "view__one", content: [<Main />] },
        { className: "view__two", content: [<SubMain />] },
        { className: "view__three", content: [<Info currentSection={currentSection} currentItem={currentItemInfo} setCurrentItem={setCurrentItemInfo}/>] },
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
        { className: "view__five", content: [<Projects currentSection={currentSection}/>] },
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
        { className: "view__eight", content: [<Form />] },
    ];


    // 1. Обычная функция прокрутки (ваша изначальная логика)
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

    // 2. Функция прокрутки только вверх
    const handleWheelUp = useCallback(
        (e) => {
            if (isThrottling || !isPageLoaded || e.deltaY > 0) {  // Проверка, чтобы разрешить только прокрутку вверх
                e.preventDefault(); // Игнорируем события, если throttling включён или страница не загружена, или если прокрутка вниз
                return;
            }

            // Устанавливаем флаг троттлинга
            isThrottling = true;
            setTimeout(() => {
                isThrottling = false; // Сбрасываем троттлинг через 1.5 секунды
            }, 1500);

            // Прокрутка вверх
            setCurrentSection((prev) => Math.max(prev - 1, 0));
            e.preventDefault();
        },
        [isPageLoaded]
    );


    // 3. Функция прокрутки только вниз
    const handleWheelDown = useCallback(
        (e) => {
            if (isThrottling || !isPageLoaded || e.deltaY < 0) {  // Проверка, чтобы разрешить только прокрутку вниз
                e.preventDefault(); // Игнорируем события, если throttling включён или страница не загружена, или если прокрутка вверх
                return;
            }

            // Устанавливаем флаг троттлинга
            isThrottling = true;
            setTimeout(() => {
                isThrottling = false; // Сбрасываем троттлинг через 1.5 секунды
            }, 1500);

            // Прокрутка вниз
            setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
            e.preventDefault();
        },
        [isPageLoaded, sections.length]
    );


    //working code

    // useEffect(() => {
    //     const wrapper = document.querySelector(".page__wrapper");

    //     // Отслеживаем загрузку страницы
    //     window.addEventListener("load", () => {
    //         setIsPageLoaded(true);
    //         setCurrentSection(0); // Устанавливаем начальную позицию секции при загрузке
    //     });

    //     // Добавляем событие для колесика
    //     wrapper.addEventListener("wheel", handleWheel, { passive: false });

    //     // Убираем обработчик событий при размонтировании компонента
    //     return () => {
    //         wrapper.removeEventListener("wheel", handleWheel);
    //     };
    // }, [handleWheel]);

    //test code

    useEffect(() => {
        const wrapper = document.querySelector(".page__wrapper");

        // Обработчик по умолчанию
        const defaultWheelHandler = () => {
            wrapper.addEventListener("wheel", handleWheel, { passive: false });
        };

        // Устанавливаем флаг загрузки страницы
        const onPageLoad = () => {
            setIsPageLoaded(true);
            setCurrentSection(0); // Начальная позиция секции
        };

        // Логика для разных секций
        switch (currentSection) {
            case 2:
                console.log("Current section is 2");
                wrapper.removeEventListener("wheel", handleWheel);
                if (currentItemInfo === 0) {
                    console.log("currentItemInfo is 0, using scroll up");
                    wrapper.addEventListener("wheel", handleWheelUp, { passive: false }); // Прокрутка вверх
                } else if (currentItemInfo === 2) {
                    console.log("currentItemInfo is 2, using scroll down");
                    wrapper.addEventListener("wheel", handleWheelDown, { passive: false }); // Прокрутка вниз
                } else if (currentItemInfo === 1){
                    console.log("No scroll logic for currentItemInfo");
                    wrapper.removeEventListener("wheel", handleWheelDown,);
                    wrapper.removeEventListener("wheel", handleWheelUp,);
                }
                break;
            case 4:
                console.log("Current section is 4");
                wrapper.removeEventListener("wheel", handleWheel);
                break;
            case 6:
                console.log("Current section is 6");
                wrapper.removeEventListener("wheel", handleWheel);
                break;
            // case 7:
            //     console.log("Current section is 7");
            //     wrapper.removeEventListener("wheel", handleWheel);
            //     break;
            default:
                console.log("Default: Adding wheel handler");
                defaultWheelHandler(); // Добавляем обработчик
                break;
        }

        // Добавляем событие загрузки страницы
        window.addEventListener("load", onPageLoad);

        return () => {
            // Убираем обработчики событий при размонтировании компонента
            wrapper.removeEventListener("wheel", handleWheel);
            window.removeEventListener("load", onPageLoad);
        };
}, [currentSection, currentItemInfo, handleWheel, handleWheelUp, handleWheelDown]);


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
                        {["view__two", "view__six", "view__seven", "view__eight"].includes(section.className) ? (
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
