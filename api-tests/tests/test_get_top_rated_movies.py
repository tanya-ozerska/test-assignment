import requests
import pytest

# Test: Valid Request for Top-Rated Movies
@pytest.mark.parametrize("params, expected_status_code", [({'language': 'en-US', 'page': 1}, 200)])
def test_get_top_rated_movies_valid(params, expected_status_code, url_top_rated, headers):
    response = requests.get(url_top_rated, headers=headers, params=params)
    assert response.status_code == expected_status_code

# Test: Missing Authorization Token for Top-Rated Movies
@pytest.mark.parametrize("headers, expected_status_code", [({}, 401)])
def test_missing_token_top_rated(headers, expected_status_code, url_top_rated):
    response = requests.get(url_top_rated, headers=headers)
    assert response.status_code == expected_status_code

# Test: Invalid Token for Top-Rated Movies
@pytest.mark.parametrize("token, expected_status_code", [("INVALID_TOKEN", 401)])
def test_invalid_token_top_rated(token, expected_status_code, url_top_rated):
    response = requests.get(url_top_rated, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == expected_status_code

# Test: Invalid Language Parameter for Top-Rated Movies
@pytest.mark.parametrize("params, expected_status_code", [({'language': 'xx-XX', 'page': 1}, 200)])
def test_invalid_language(params, expected_status_code, url_top_rated, headers):
    response = requests.get(url_top_rated, headers=headers, params=params)
    assert response.status_code == expected_status_code

# Test: Non-Existent Page for Top-Rated Movies
@pytest.mark.parametrize("params, expected_status_code", [({'language': 'en-US', 'page': 501}, 400)])
def test_non_existent_page(params, expected_status_code, url_top_rated, headers):
    response = requests.get(url_top_rated, headers=headers, params=params)
    assert response.status_code == expected_status_code
