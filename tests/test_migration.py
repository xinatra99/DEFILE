"""Compatibility boundaries for the product identity migration."""

from defile.compat import env_value
from defile.rules import load_rules


def test_environment_migration_precedence(monkeypatch):
    monkeypatch.delenv("DEFILE_MORIA", raising=False)
    monkeypatch.setenv("IFDA_MORIA", "/legacy/moria")
    assert env_value("DEFILE_MORIA") == "/legacy/moria"
    monkeypatch.setenv("DEFILE_MORIA", "/current/moria")
    assert env_value("DEFILE_MORIA") == "/current/moria"
    monkeypatch.setenv("DEFILE_MORIA", "")
    assert env_value("DEFILE_MORIA") == ""


def test_custom_rule_schema_remains_compatible(tmp_path):
    # Existing custom rules keep their IDs and matching semantics.
    source = tmp_path / "rules.json"
    source.write_text('{"schema":"ifda-secret-rules/1","rules":[{"id":"custom",'
                      '"name":"Custom token","regex":"token=[a-z]+"}]}', encoding="utf-8")
    rules, _ = load_rules(str(source))
    assert len(rules) == 1 and rules[0].id == "custom"
    assert rules[0].regex.search("token=example")
