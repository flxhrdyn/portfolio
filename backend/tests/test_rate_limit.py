from app.rate_limit import get_client_ip


def test_get_client_ip_uses_rightmost_forwarded_for_entry():
    # The rightmost entry is the one appended by the trusted edge proxy; earlier
    # entries (e.g. "1.2.3.4" here) are client-supplied and must not be trusted.
    headers = {"x-forwarded-for": "1.2.3.4, 5.6.7.8"}
    assert get_client_ip(headers, "9.9.9.9") == "5.6.7.8"


def test_get_client_ip_falls_back_to_client_host():
    assert get_client_ip({}, "9.9.9.9") == "9.9.9.9"


def test_get_client_ip_returns_unknown_when_no_client():
    assert get_client_ip({}, None) == "unknown"
