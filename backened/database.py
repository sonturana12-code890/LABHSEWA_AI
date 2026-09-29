"""SQLite storage for the public welfare and credit scheme catalog."""

import json
import os
import sqlite3
from pathlib import Path
from typing import Any


DATABASE_PATH = Path(
    os.environ.get("LABHSEWA_DB_PATH", Path(__file__).with_name("labhsewa.sqlite3"))
)


def _connect() -> sqlite3.Connection:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database(seed_data: dict[str, Any]) -> None:
    """Create catalog tables and seed them once from the existing JSON catalog."""
    with _connect() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS metadata (
                key TEXT PRIMARY KEY,
                value_json TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS welfare_schemes (
                scheme_id TEXT PRIMARY KEY,
                position INTEGER NOT NULL,
                data_json TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS credit_schemes (
                scheme_id TEXT PRIMARY KEY,
                position INTEGER NOT NULL,
                data_json TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS channel_partners (
                partner_id TEXT PRIMARY KEY,
                position INTEGER NOT NULL,
                state TEXT NOT NULL DEFAULT '',
                fund_health_status TEXT NOT NULL DEFAULT '',
                data_json TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_channel_partners_state
                ON channel_partners(state);
            CREATE INDEX IF NOT EXISTS idx_channel_partners_health
                ON channel_partners(fund_health_status);
            """
        )

        for key in (
            "INDIAN_STATES",
            "EDUCATION_LEVELS",
            "DISABILITY_TYPES",
            "SCHEME_CATEGORIES",
        ):
            connection.execute(
                "INSERT OR IGNORE INTO metadata (key, value_json) VALUES (?, ?)",
                (key, json.dumps(seed_data.get(key, []), ensure_ascii=False)),
            )

        for table, key in (
            ("welfare_schemes", "SCHEME_DATABASE"),
            ("credit_schemes", "CREDIT_SCHEME_DATABASE"),
        ):
            for position, record in enumerate(seed_data.get(key, [])):
                record_id = str(record.get("id", f"{key.lower()}_{position}"))
                connection.execute(
                    f"INSERT OR IGNORE INTO {table} (scheme_id, position, data_json) "
                    "VALUES (?, ?, ?)",
                    (record_id, position, json.dumps(record, ensure_ascii=False)),
                )

        for position, record in enumerate(seed_data.get("CHANNEL_PARTNERS_DATABASE", [])):
            partner_id = str(record.get("id", f"partner_{position}"))
            connection.execute(
                "INSERT OR IGNORE INTO channel_partners "
                "(partner_id, position, state, fund_health_status, data_json) "
                "VALUES (?, ?, ?, ?, ?)",
                (
                    partner_id,
                    position,
                    str(record.get("state", "")),
                    str(record.get("fundHealthStatus", "")),
                    json.dumps(record, ensure_ascii=False),
                ),
            )


def load_schemes_data() -> dict[str, Any]:
    """Load the same catalog shape previously provided by schemes.json."""
    with _connect() as connection:
        data: dict[str, Any] = {}
        for row in connection.execute("SELECT key, value_json FROM metadata"):
            data[row["key"]] = json.loads(row["value_json"])

        for table, key in (
            ("welfare_schemes", "SCHEME_DATABASE"),
            ("credit_schemes", "CREDIT_SCHEME_DATABASE"),
            ("channel_partners", "CHANNEL_PARTNERS_DATABASE"),
        ):
            rows = connection.execute(
                f"SELECT data_json FROM {table} ORDER BY position, rowid"
            )
            data[key] = [json.loads(row["data_json"]) for row in rows]

        return data


def get_database_stats() -> dict[str, int]:
    """Return catalog counts for the database health endpoint."""
    with _connect() as connection:
        return {
            "welfareSchemes": connection.execute(
                "SELECT COUNT(*) FROM welfare_schemes"
            ).fetchone()[0],
            "creditSchemes": connection.execute(
                "SELECT COUNT(*) FROM credit_schemes"
            ).fetchone()[0],
            "channelPartners": connection.execute(
                "SELECT COUNT(*) FROM channel_partners"
            ).fetchone()[0],
        }