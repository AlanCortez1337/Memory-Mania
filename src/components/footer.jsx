const ScoreBoard = (revealScore) => {
    
    return(

        <footer>

            {!revealScore ? 
            <div className="footer-card reveal-stats">
                <div>
                    Total Mismatches This game:
                </div>
                <div className="total-stats">
                    <h3>Total Clicks:</h3>
                    <h3>Mismatched:</h3>
                </div>
            </div> :
            
            <div className="footer-card">
                <div className="total-stats">
                    <h3>Total Clicks:</h3>
                    <h3>Mismatched:</h3>
                </div>
            </div>
            }



            
        </footer>
    );
};

export default ScoreBoard;