import sqlite3
from pathlib import Path


def execute_sql_statements(connection: sqlite3.Connection, sql_path: Path):
    sql_text = sql_path.read_text(encoding='utf-8')
    statements = []
    buffer = ''

    for line in sql_text.splitlines():
        buffer += line + '\n'
        if sqlite3.complete_statement(buffer):
            statements.append(buffer.strip())
            buffer = ''

    if buffer.strip():
        statements.append(buffer.strip())

    if not statements:
        return []

    if len(statements) == 1:
        return connection.execute(statements[0]).fetchall()

    connection.executescript(';\n'.join(statements[:-1]))
    return connection.execute(statements[-1]).fetchall()


project_root = Path(__file__).resolve().parent.parent
sql_dir = project_root / 'sql'
results_dir = sql_dir / 'results'
results_dir.mkdir(exist_ok=True)

conn = sqlite3.connect(':memory:')
conn.row_factory = sqlite3.Row

schema_sql = (sql_dir / 'schema.sql').read_text(encoding='utf-8')
conn.executescript(schema_sql)

round_trip_rows = execute_sql_statements(conn, sql_dir / 'scenario1_round_trip.sql')

ipl_sql = (sql_dir / 'ipl_schema.sql').read_text(encoding='utf-8')
conn.executescript(ipl_sql)
ipl_rows = execute_sql_statements(conn, sql_dir / 'scenario2_ipl_streak.sql')

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
