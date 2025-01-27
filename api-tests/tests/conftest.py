import os
import pytest
import requests
from dotenv import load_dotenv
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'test-data')))
from test_data import MOVIE_ID 

load_dotenv()

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
BASE_URL = os.getenv("BASE_URL")

if not ACCESS_TOKEN or not BASE_URL:
    raise ValueError("Access token or Base URL not found in environment variables.")

@pytest.fixture
def headers():
    """Fixture to provide headers with the authorization token."""
    return {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    }

@pytest.fixture
def base_url():
    """Fixture to provide the base URL."""
    return BASE_URL

@pytest.fixture
def api_version():
    """Fixture to provide the API version, defaulting to '3'."""
    return "3" 

@pytest.fixture
def url_movie_rating(base_url, api_version):
    """Fixture to provide the movie rating URL, dynamically including the API version."""
    return f"{base_url}/{api_version}/movie/{MOVIE_ID}/rating"

@pytest.fixture
def url_top_rated(base_url, api_version):
    """Fixture to provide the top-rated movies URL, dynamically including the API version."""
    return f"{base_url}/{api_version}/movie/top_rated"
