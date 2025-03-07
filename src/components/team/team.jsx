

import teamFirst from '../../assets/team/team_1.png'

import './team.scss'

function Team(){


    return(
        <section className="team">
            <div className="container">
                <div className="team__wrapper">
                    <div className="team__main row">
                        <div className="team__left col-4">
                            <div className="team__current"><span>1</span>/8</div>
                        </div>
                        <div className="team__right col-8">
                            <div className="team__circle">
                                <div className="team__right_wrapper">
                                    <img src={teamFirst} alt="" className="team__item" />
                                </div>
                            </div>
                            <div className="team__names">
                                <div className="team__names_item">
                                    <div className="team__names_name current">Дарья <span>понкратова</span></div>
                                    <div className="team__names_prof">Управляющий партнер. Бренд стратег</div>
                                </div>
                                <div className="team__names_item">
                                    <div className="team__names_name inactive">Элина <span>мергалиева</span></div>
                                    <div className="team__names_prof"></div>
                                </div>
                                <div className="team__names_item">
                                    <div className="team__names_name last">Артур <span>Понкратов</span></div>
                                    <div className="team__names_prof"></div>
                                </div>
                            </div>
                            <div className="team__more">Узнать больше </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team