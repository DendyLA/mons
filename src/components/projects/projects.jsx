// import { useEffect } from "react";

// import "./projects.scss";

// import firstProject from "../../assets/project_1.png";
// import secondProject from "../../assets/project_2.png";

// function Projects({currentSection, projectItems, setCurrentItemProjects, currentItemProjects}) {
//     // const projectItems = [
//     //     {
//     //     img: firstProject,
//     //     name: "Krondstadt Asset Management",
//     //     about: "Инвестиционный фонд",
//     //     theme: ["Стратегия", "Айдентика", "Web", "Гайд", "Дистрибуционная концепция"],
//     //     },
//     //     {
//     //     img: firstProject,
//     //     name: "Unicorn studio",
//     //     about: "ИТ компания",
//     //     theme: ["Тактика", "Маркетинг", "Web", "Реклама", "Дистрибуционная концепция"],
//     //     },
//     // ];

//     useEffect(() => {
//         const cursor = document.querySelector(".cursor");
//         const projectsRight = document.querySelector(".projects__item");
    
//         const moveCursor = (e) => {
//             const rect = projectsRight.getBoundingClientRect();
    
//             // Проверяем, находится ли мышь внутри родителя
//             if (
//                 e.clientX >= rect.left &&
//                 e.clientX <= rect.right &&
//                 e.clientY >= rect.top &&
//                 e.clientY <= rect.bottom
//             ) {
//                 cursor.style.opacity = "1"; // Делаем видимым
//                 cursor.style.left = `${e.clientX}px`; // Устанавливаем X
//                 cursor.style.top = `${e.clientY}px`; // Устанавливаем Y
//             } else {
//                 cursor.style.opacity = "0"; // Прячем курсор
//             }
//         };
    
//         document.addEventListener("mousemove", moveCursor);
    
//         return () => {
//             document.removeEventListener("mousemove", moveCursor);
//         };
//     }, []);
    
    
    
//     return (
//         <section className="projects">
//             <div className="container">
//                 <div className="projects__second">
//                 <div className="projects__second_wrapper row">
//                     {/* Левая колонка */}
//                     <div className="projects__left col-4">
//                     <div className="projects__static">
//                         <div className="projects__current">
//                         <span>1</span>/{projectItems.length}
//                         </div>
//                         <div className="projects__link">Посмотреть кейсы</div>
//                     </div>

//                     {projectItems.map((project, index) => (
//                         <div
//                         key={index}
//                         className={`projects__info_wrapper ${
//                             index === 0 ? "visible" : "hidden"
//                         }`}
//                         >
//                             <div className="projects__main">
//                                 <div className="projects__name">{project.name}</div>
//                                 <div className="projects__about">{project.about}</div>
//                             </div>
//                             <div className="projects__theme">
//                                 {project.theme.map((themeItem, i) => (
//                                 <div key={i} className="projects__theme_item">
//                                     {themeItem}
//                                 </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                     </div>

//                     {/* Правая колонка */}
//                     <div className="projects__right col-7 offset-1">
//                         {projectItems.map((project, index) => (
//                             <div key={index} className="projects__item">
//                                 <img src={project.img} alt={project.name} />
//                             </div>
//                         ))}
//                         <div className="cursor">
//                             <div className="custom-cursor"></div>
//                             <div className="button-wrapper">К проекту</div>
//                         </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Projects;


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

            // Проверяем, находится ли мышь внутри projects__right
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                cursor.style.opacity = "1"; // Делаем курсор видимым

                // Рассчитываем положение курсора относительно контейнера
                cursor.style.left = `${e.clientX - rect.left}px`; // X в пределах контейнера
                cursor.style.top = `${e.clientY - rect.top}px`; // Y в пределах контейнера
            } else {
                cursor.style.opacity = "0"; // Прячем курсор, если мышь не внутри
            }
        };

        document.addEventListener("mousemove", moveCursor);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
        };
    }, [currentHoveredItem]);

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


