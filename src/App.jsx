import {useState, useEffect} from 'react'

import Header from './components/header/header'
import Main from './components/main/main'
import SubMain from './components/subMain/SubMain'


import './App.css'

function App() {

	const [currentSection, setCurrentSection] = useState(0); // Индекс текущей секции

  // Массив секций с несколькими контентами для каждой
	const sections = [
		{
		className: "view__one",
		content: [
			<Main />
		],
		},
		{
		className: "view__two",
		content: [
			<SubMain />
		],
		}
		//add here
	];

	const handleWheel = (e) => {
		if (e.deltaY > 0) {
			// Прокрутка вниз: переходим к следующей секции, если есть
			setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
		} else {
			// Прокрутка вверх: возвращаемся к предыдущей секции, если есть
			setCurrentSection((prev) => Math.max(prev - 1, 0));
		}
	};

	useEffect(() => {
		const wrapper = document.querySelector(".page__wrapper");
		wrapper.addEventListener("wheel", handleWheel);

		return () => {
		wrapper.removeEventListener("wheel", handleWheel);
		};
	}, []);


return (
	<div className="page">
	<Header/>
		<div className="page__wrapper" style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: "transform 2s ease", // Плавный переход
        }}>
			<div className="noise"></div>
			{sections.map((section, index) => (
			<div
				key={index}
				className={`view ${section.className}`}
				style={{
				// opacity: currentSection === index ? 1 : 0,
				// transform: currentSection === index ? "translateY(0)" : "translateY(20px)",
				// transition: "opacity 1s ease, transform 1s ease",
				}}
			>
				{section.className == 'view__two' ? <div className="noise"></div> : ''}
				{section.content.map((content, i) => (
				<div
					key={i}
					className='content__wrapper'
					style={{
					opacity: currentSection === index ? 1 : 0,
					transform: currentSection === index ? "translateY(0)" : "translateY(20px)",
					transition: "opacity 1s ease, transform 1s ease",
					}}
				>
					{content}
				</div>
				))}
				</div>
			))}
		</div>
	</div>
		

)
}

export default App
