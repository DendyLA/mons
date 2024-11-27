import { useEffect } from 'react';


import './projects.scss'

import firstProject from '../../assets/project_1.png'

function Projects(){

    useEffect(() => {
        const cursor = document.querySelector(".cursor");
        const projectsRight = document.querySelector(".projects__right");
    
        const moveCursor = (e) => {
          // Получаем размеры контейнера
            const rect = projectsRight.getBoundingClientRect();
    
          // Проверяем, находится ли курсор внутри контейнера
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

    return(
        <section className="projects">
            <div className="container">
                <div className="projects__second">
                    <div className="projects__second_wrapper row">
                        <div className="projects__left col-4">
                            <div className="projects__static">
                                <div className="projects__current"><span>1</span>/4 </div>
                                <div className="projects__link">Посмотреть кейсы</div>
                            </div>
                            <div className="projects__info">
                                <div className="projects__main">
                                    <div className="projects__name">Krondstadt Asset Management</div>
                                    <div className="projects__about">Инвестиционный фонд</div>
                                </div>
                                <div className="projects__theme">
                                    <div className="projects__theme_item">Стратегия</div>
                                    <div className="projects__theme_item">Айдентика</div>
                                    <div className="projects__theme_item">Web</div>
                                    <div className="projects__theme_item">Гайд</div>
                                    <div className="projects__theme_item">Дистрибуционная концепция </div>
                                </div>
                            </div>
                        </div>
                        <div className="projects__right col-7 offset-1">
                            <div className="projects__item">
                                <img src={firstProject} alt="" />
                            </div>
                        
                            <div className="cursor">
                                <div className="custom-cursor"></div>
                                <div className="button-wrapper">К проекту </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects