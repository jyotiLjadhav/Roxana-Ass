WITH scored AS (
    SELECT
        player_name,
        match_date,
        runs,
        ROW_NUMBER() OVER (PARTITION BY player_name ORDER BY match_date) -
        ROW_NUMBER() OVER (PARTITION BY player_name, CASE WHEN runs >= 30 THEN 1 ELSE 0 END ORDER BY match_date) AS streak_group
    FROM ipl_match_scores
    WHERE runs >= 30
),
qualified_streaks AS (
    SELECT
        player_name,
        MIN(match_date) AS streak_start_date,
        COUNT(*) AS streak_length
    FROM scored
    GROUP BY player_name, streak_group
)
SELECT
    player_name,
    streak_start_date
FROM qualified_streaks
WHERE streak_length >= 3
ORDER BY player_name, streak_start_date;
