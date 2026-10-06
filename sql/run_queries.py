import sqlite3
from pathlib import Path

project_root = Path(__file__).resolve().parent.parent
sql_dir = project_root / 'sql'
results_dir = sql_dir / 'results'
results_dir.mkdir(exist_ok=True)

conn = sqlite3.connect(':memory:')
conn.row_factory = sqlite3.Row

schema_sql = (sql_dir / 'schema.sql').read_text(encoding='utf-8')
conn.executescript(schema_sql)

# Round trip data
round_trip_sql = (sql_dir / 'scenario1_round_trip.sql').read_text(encoding='utf-8')
# scenario1_round_trip.sql contains both inserts and query; split it at the final SELECT
query_start = round_trip_sql.rfind('SELECT')
insert_sql = round_trip_sql[:query_start]
query_sql = round_trip_sql[query_start:]
conn.executescript(insert_sql)
round_trip_rows = conn.execute(query_sql).fetchall()

# IPL data
ipl_sql = (sql_dir / 'ipl_schema.sql').read_text(encoding='utf-8')
conn.executescript(ipl_sql)
ipl_query = (sql_dir / 'scenario2_ipl_streak.sql').read_text(encoding='utf-8')
ipl_rows = conn.execute(ipl_query).fetchall()

(round_trip_results_path := results_dir / 'round_trip_results.txt').write_text(
    '\n'.join([
        'Round-trip transactions query output',
        '===================================',
        'account_a | account_b | t1_amount | t2_amount | amount_difference | percentage_difference | seconds_difference',
        *[
            f"{row['account_a']} | {row['account_b']} | {row['t1_amount']} | {row['t2_amount']} | {row['amount_difference']} | {row['percentage_difference']} | {row['seconds_difference']}"
            for row in round_trip_rows
        ],
    ]) + '\n',
    encoding='utf-8',
)

(ipl_results_path := results_dir / 'ipl_streak_results.txt').write_text(
    '\n'.join([
        'IPL streak query output',
        '======================',
        'player_name | streak_start_date',
        *[
            f"{row['player_name']} | {row['streak_start_date']}"
            for row in ipl_rows
        ],
    ]) + '\n',
    encoding='utf-8',
)

print(f'Round-trip results: {len(round_trip_rows)} rows -> {round_trip_results_path}')
print(f'IPL results: {len(ipl_rows)} rows -> {ipl_results_path}')
