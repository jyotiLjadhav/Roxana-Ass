CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY,
    sender_account TEXT NOT NULL,
    receiver_account TEXT NOT NULL,
    amount REAL NOT NULL,
    transaction_time TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ipl_match_scores (
    match_id INTEGER PRIMARY KEY,
    match_date TEXT NOT NULL,
    player_name TEXT NOT NULL,
    team TEXT NOT NULL,
    runs INTEGER NOT NULL
);
