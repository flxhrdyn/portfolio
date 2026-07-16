from app.rate_limit import get_client_ip


def test_get_client_ip_uses_forwarded_for_header():
    headers = {"x-forwarded-for": "1.2.3.4, 5.6.7.8"}
    assert get_client_ip(headers, "9.9.9.9") == "1.2.3.4"


def test_get_client_ip_falls_back_to_client_host():
    assert get_client_ip({}, "9.9.9.9") == "9.9.9.9"


def test_get_client_ip_returns_unknown_when_no_client():
    assert get_client_ip({}, None) == "unknown"
