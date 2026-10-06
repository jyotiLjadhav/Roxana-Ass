CREATE TABLE IF NOT EXISTS ipl_match_scores (
    match_id INTEGER PRIMARY KEY,
    match_date TEXT NOT NULL,
    player_name TEXT NOT NULL,
    team TEXT NOT NULL,
    runs INTEGER NOT NULL
);

DELETE FROM ipl_match_scores;

INSERT INTO ipl_match_scores (match_id, match_date, player_name, team, runs) VALUES
    (1, '2024-03-22', 'Rohit Sharma', 'Mumbai Indians', 45),
    (2, '2024-03-24', 'Rohit Sharma', 'Mumbai Indians', 32),
    (3, '2024-03-26', 'Rohit Sharma', 'Mumbai Indians', 41),
    (4, '2024-03-29', 'Rohit Sharma', 'Mumbai Indians', 18),
    (5, '2024-03-31', 'Rohit Sharma', 'Mumbai Indians', 36),
    (6, '2024-04-02', 'Rohit Sharma', 'Mumbai Indians', 14),
    (7, '2024-03-22', 'Virat Kohli', 'Royal Challengers Bengaluru', 27),
    (8, '2024-03-25', 'Virat Kohli', 'Royal Challengers Bengaluru', 53),
    (9, '2024-03-28', 'Virat Kohli', 'Royal Challengers Bengaluru', 31),
    (10, '2024-03-30', 'Virat Kohli', 'Royal Challengers Bengaluru', 22),
    (11, '2024-04-01', 'Virat Kohli', 'Royal Challengers Bengaluru', 35),
    (12, '2024-04-04', 'Virat Kohli', 'Royal Challengers Bengaluru', 40),
    (13, '2024-03-23', 'Shubman Gill', 'Gujarat Titans', 51),
    (14, '2024-03-27', 'Shubman Gill', 'Gujarat Titans', 64),
    (15, '2024-03-30', 'Shubman Gill', 'Gujarat Titans', 29),
    (16, '2024-04-03', 'Shubman Gill', 'Gujarat Titans', 33),
    (17, '2024-04-05', 'Shubman Gill', 'Gujarat Titans', 35),
    (18, '2024-04-08', 'Shubman Gill', 'Gujarat Titans', 18),
    (19, '2024-03-24', 'Yashasvi Jaiswal', 'Rajasthan Royals', 39),
    (20, '2024-03-26', 'Yashasvi Jaiswal', 'Rajasthan Royals', 44),
    (21, '2024-03-30', 'Yashasvi Jaiswal', 'Rajasthan Royals', 25),
    (22, '2024-04-02', 'Yashasvi Jaiswal', 'Rajasthan Royals', 33),
    (23, '2024-04-05', 'Yashasvi Jaiswal', 'Rajasthan Royals', 47),
    (24, '2024-04-07', 'Yashasvi Jaiswal', 'Rajasthan Royals', 32);
