
//working now


import { useEffect, useState } from "react";
import "./projects.scss";

function Projects({ currentSection, projectItems, setCurrentItemProjects, currentItemProjects }) {
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); // Для блокировки скролла во время анимации
    const [currentHoveredItem, setCurrentHoveredItem] = useState(currentItemProjects); // Инициализация текущего элемента, за которым следит курсор

    // Анимация курсора
    useEffect(() => {
        const cursor = document.querySelector(".cursor");
        const projectsRight = document.querySelector(".projects__right");
    
        const moveCursor = (e) => {
            const rect = projectsRight.getBoundingClientRect();
    
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                cursor.style.opacity = "1";
                cursor.style.left = `${e.clientX - rect.left}px`;
                cursor.style.top = `${e.clientY - rect.top}px`;
            } else {
                cursor.style.opacity = "0";
            }
        };
    
        const refreshRect = () => {
            // Принудительное обновление
            projectsRight.style.transform = "translateZ(0)";
            const rect = projectsRight.getBoundingClientRect();
            console.log("Rect after forced update:", rect);
            return rect;
        };
    
        if (currentSection === 4) {
            setTimeout(() => {
                refreshRect();
                document.addEventListener("mousemove", moveCursor);
            }, 100);
        }
    
        return () => {
            document.removeEventListener("mousemove", moveCursor);
        };
    }, [currentSection]);
    
    
    

    // Включение скролла через 1 секунду
    useEffect(() => {
        if (currentSection === 4) {
            const enableScrollTimeout = setTimeout(() => setIsScrollEnabled(true), 1000);
            return () => clearTimeout(enableScrollTimeout);
        } else {
            setIsScrollEnabled(false);
        }
    }, [currentSection]);

    // Обработка скролла
    useEffect(() => {
        if (currentSection !== 4 || !isScrollEnabled) return;

        setCurrentItemProjects(0)
        const projectsRight = document.querySelector(".projects__right");

        let isScrolling = false; // Флаг для предотвращения повторного скролла

        const handleWheel = (e) => {
            if (isAnimating || isScrolling) {
                e.preventDefault();
                return; // Блокируем скролл, если идёт анимация
            }

            const itemHeight = 710 + 45; // Высота + gap

            isScrolling = true; // Блокируем повторный вызов
            setIsAnimating(true);

            if (e.deltaY > 0 && currentItemProjects < projectItems.length - 1) {
                // Скролл вниз
                setCurrentItemProjects((prev) => prev + 1);
                projectsRight.style.transform = `translateY(-${(currentItemProjects + 1) * itemHeight}px)`;
            } else if (e.deltaY < 0 && currentItemProjects > 0) {
                // Скролл вверх
                setCurrentItemProjects((prev) => prev - 1);
                projectsRight.style.transform = `translateY(-${(currentItemProjects - 1) * itemHeight}px)`;
            }

            // Сбрасываем блокировку через 1.5 секунды
            setTimeout(() => {
                setIsAnimating(false);
                isScrolling = false;
            }, 1500);

            e.preventDefault(); // Блокируем стандартный скролл браузера
        };

        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, [currentSection, isScrollEnabled, isAnimating, currentItemProjects, projectItems.length]);

    // Обработка клика на проект
    const handleItemClick = (index) => {
        console.log("Выбранный проект с индексом:", index); // Выводим индекс в консоль
        setCurrentItemProjects(index); // Обновление текущего проекта
        setCurrentHoveredItem(index); // Обновление состояния для отслеживания текущего элемента
    };

    return (
        <section className="projects">
            <div className="container">
                <div className="projects__second">
                    <div className="projects__second_wrapper row">
                        {/* Левая колонка */}
                        <div className="projects__left col-4">
                            <div className="projects__static">
                                <div className="projects__current">
                                    <span>{currentItemProjects + 1}</span>/{projectItems.length}
                                </div>
                                <div className="projects__link">Посмотреть кейсы</div>
                            </div>

                            {projectItems.map((project, index) => (
                                <div
                                    key={index}
                                    className={`projects__info_wrapper ${
                                        currentItemProjects === index ? "visible" : "hidden"
                                    }`}
                                >
                                    <div className="projects__main">
                                        <div className="projects__name">{project.name}</div>
                                        <div className="projects__about">{project.about}</div>
                                    </div>
                                    <div className="projects__theme">
                                        {project.theme.map((themeItem, i) => (
                                            <div key={i} className="projects__theme_item">
                                                {themeItem}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Правая колонка */}
                        <div className="projects__right col-7 offset-1">
                            {projectItems.map((project, index) => (
                                <div
                                    key={index}
                                    className={`projects__item ${currentItemProjects === index ? "active" : ""}`} // Активируем только текущий элемент
                                    onClick={() => handleItemClick(index)} // Добавляем обработчик клика
                                    data-index={index} // Добавляем data-атрибут для отслеживания элемента
                                >
                                    <img src={project.img} alt={project.name} />
                                </div>
                            ))}
                            <div className="cursor">
                                <div className="custom-cursor"></div>
                                <div className="button-wrapper">К проекту</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;


