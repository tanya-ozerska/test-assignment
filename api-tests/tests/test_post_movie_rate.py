import requests
import pytest

# Test: Valid Rating
@pytest.mark.parametrize("payload, expected_status_code", [({"value": 9}, 201)])
def test_add_rating_valid(payload, expected_status_code, url_movie_rating, headers):
    response = requests.post(url_movie_rating, headers=headers, json=payload)
    assert response.status_code == expected_status_code
    assert 'status_code' in response.json()

# Test: Missing Authorization Token
@pytest.mark.parametrize("headers, expected_status_code", [({}, 401)])
def test_missing_token(headers, expected_status_code, url_movie_rating):
    response = requests.post(url_movie_rating, headers=headers, json={"value": 9})
    assert response.status_code == expected_status_code
    assert 'status_message' in response.json()

# Test: Invalid Token
@pytest.mark.parametrize("token, expected_status_code", [("INVALID_TOKEN", 401)])
def test_invalid_token(token, expected_status_code, url_movie_rating):
    response = requests.post(url_movie_rating, headers={"Authorization": f"Bearer {token}"}, json={"value": 9})
    assert response.status_code == expected_status_code
    assert 'status_message' in response.json()

# Test: Invalid Movie ID
@pytest.mark.parametrize("movie_id, expected_status_code", [(0, 404)])
def test_invalid_movie_id(movie_id, expected_status_code, base_url, headers, api_version):
    url = f"{base_url}/{api_version}/movie/{movie_id}/rating"
    response = requests.post(url, headers=headers, json={"value": 9})
    assert response.status_code == expected_status_code
    assert 'status_message' in response.json()

# Test: Invalid Rating Value
@pytest.mark.parametrize("rating, expected_status_code", [({"value": 11}, 400)])
def test_invalid_rating_value(rating, expected_status_code, url_movie_rating, headers):
    response = requests.post(url_movie_rating, headers=headers, json=rating)
    assert response.status_code == expected_status_code
    assert 'status_message' in response.json()

# Test: Missing Rating Value
@pytest.mark.parametrize("payload, expected_status_code", [({}, 400)])
def test_missing_rating_value(payload, expected_status_code, url_movie_rating, headers):
    response = requests.post(url_movie_rating, headers=headers, json=payload)
    assert response.status_code == expected_status_code
    assert 'status_message' in response.json()
