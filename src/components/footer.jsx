const ScoreBoard = ({revealScore, amtClicks, amtMismatches, message}) => {
    // Clicks, Total Clicks, Total Misclicks, Misclicks
    



    return(
        
        <>
            <footer className="footer-card">
                

                <div className="total-stats">
                    <h3>Current Clicks: {amtClicks}</h3>
                    <h3>Mismatched: {amtMismatches}</h3>
                </div>
                
            </footer>
            
            <div className={`info-card ${ revealScore ? "reveal-card": "hidden"}`} >
                <div className="reveal-stats">
                    {message}
                </div> 
            </div>
                
        </>


    );
};

export default ScoreBoard;