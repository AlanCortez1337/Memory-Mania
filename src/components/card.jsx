const Card = ({image, selected, active, onClick}) => {
    return(
        <div className={`card ${active ? 'active' : ''}`}>
            <div className={selected && 'selected'}>
                <img src={image} alt="" className="card-face"/>

                <img src="../assests/test.png" alt="" className="card-back" onClick={onClick}/>
            </div>
        </div>
    );
};

export default Card;