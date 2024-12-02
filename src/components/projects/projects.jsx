import { useEffect } from "react";

import "./projects.scss";

import firstProject from "../../assets/project_1.png";
import secondProject from "../../assets/project_2.png";

function Projects() {
    const projectItems = [
        {
        img: firstProject,
        name: "Krondstadt Asset Management",
        about: "Инвестиционный фонд",
        theme: ["Стратегия", "Айдентика", "Web", "Гайд", "Дистрибуционная концепция"],
        },
        {
        img: secondProject,
        name: "Unicorn studio",
        about: "ИТ компания",
        theme: ["Тактика", "Маркетинг", "Web", "Реклама", "Дистрибуционная концепция"],
        },
    ];

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
            cursor.style.opacity = 1;
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        } else {
            cursor.style.opacity = 0;
        }
        };

        document.addEventListener("mousemove", moveCursor);

        return () => {
        document.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <section className="projects">
        <div className="container">
            <div className="projects__second">
            <div className="projects__second_wrapper row">
                {/* Левая колонка */}
                <div className="projects__left col-4">
                <div className="projects__static">
                    <div className="projects__current">
                    <span>1</span>/{projectItems.length}
                    </div>
                    <div className="projects__link">Посмотреть кейсы</div>
                </div>

                {projectItems.map((project, index) => (
                    <div
                    key={index}
                    className={`projects__info_wrapper ${
                        index === 0 ? "visible" : "hidden"
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
                    <div key={index} className="projects__item">
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
