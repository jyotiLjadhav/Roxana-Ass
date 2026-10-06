CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY,
    sender_account TEXT NOT NULL,
    receiver_account TEXT NOT NULL,
    amount REAL NOT NULL,
    transaction_time TEXT NOT NULL
);

DELETE FROM transactions;

INSERT INTO transactions (id, sender_account, receiver_account, amount, transaction_time) VALUES
    (1, 'A', 'B', 1000.00, '2024-05-01 09:00:00'),
    (2, 'B', 'A', 980.00, '2024-05-01 18:00:00'),
    (3, 'A', 'C', 2000.00, '2024-05-02 08:00:00'),
    (4, 'A', 'B', 1000.00, '2024-05-03 09:00:00'),
    (5, 'B', 'A', 950.00, '2024-05-04 10:00:00'),
    (6, 'C', 'A', 500.00, '2024-05-10 12:00:00'),
    (7, 'A', 'C', 1200.00, '2024-05-11 09:00:00'),
    (8, 'D', 'E', 1000.00, '2024-05-20 10:00:00'),
    (9, 'E', 'D', 800.00, '2024-06-01 15:00:00'),
    (10, 'A', 'B', 500.00, '2024-05-09 09:00:00'),
    (11, 'B', 'A', 600.00, '2024-05-10 09:00:00');

WITH matched_pairs AS (
    SELECT
        t1.id AS t1_id,
        t2.id AS t2_id,
        t1.sender_account,
        t1.receiver_account,
        t1.amount AS t1_amount,
        t2.amount AS t2_amount,
        ABS(t1.amount - t2.amount) AS amount_difference,
        ABS(t1.amount - t2.amount) / NULLIF(GREATEST(t1.amount, t2.amount), 0) * 100 AS percentage_difference,
        (strftime('%s', t2.transaction_time) - strftime('%s', t1.transaction_time)) AS seconds_difference
    FROM transactions t1
    JOIN transactions t2
      ON t1.sender_account = t2.receiver_account
     AND t1.receiver_account = t2.sender_account
     AND t1.id < t2.id
     AND t2.transaction_time > t1.transaction_time
)
SELECT
    sender_account AS account_a,
    receiver_account AS account_b,
    t1_amount,
    t2_amount,
    amount_difference,
    percentage_difference,
    seconds_difference
FROM matched_pairs
WHERE seconds_difference <= 86400
  AND percentage_difference <= 10
ORDER BY sender_account, receiver_account, t1_id;
