import Cover from '/assests/cardCover.png'

const Card = ({image, selected, active, onClick}) => {
    return(
        <div className={`card ${active ? 'active' : ''}`}>
            <div className={selected && 'selected'}>
                <img src={image} alt="" className="card-face"/>

                <img src={Cover} alt="Cover" className="card-back" onClick={onClick}/>
            </div>
        </div>
    );
};

export default Card;