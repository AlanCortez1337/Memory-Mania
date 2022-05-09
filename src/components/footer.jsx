const ScoreBoard = ({revealScore, totClicks, totErr, err}) => {
    
    return(
        
        <>
            <footer className="footer-card">
                

                <div className="total-stats">
                    <h3>Total Clicks: {totClicks}</h3>
                    <h3>Mismatched: {totErr}</h3>
                </div>
                
            </footer>
            
            <div className={`info-card ${ revealScore ? "reveal-card": "hidden"}`} >
                <div className="reveal-stats">
                    Total Mismatches This game: {err}
                </div> 
            </div>
                
        </>


    );
};

export default ScoreBoard;