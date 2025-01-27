# PERFORMANCE TESTS

Performance Tests for [TMDB website](https://www.themoviedb.org/), specifically for [GET/movie/top_rated](https://developer.themoviedb.org/reference/movie-top-rated-list) endpoint.

This project was developed using [K6](https://k6.io/) and [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

## To run Performance Tests locally 

1. Install [Docker](https://www.docker.com/get-started/).
2. Set the global environment variables named ACCESS_TOKEN and BASE_URL with the provided values (sent in a separate file in email).
3. Clone this repository.
4. From the repository directory (`test-assignment` folder) run the following command to start the tests in Docker:

```
    docker run --rm -i \
            -v $(pwd)/performance-tests:/performance-tests \
            -e K6_WEB_DASHBOARD=true \
            -e K6_WEB_DASHBOARD_OPEN=false \
            -e K6_WEB_DASHBOARD_EXPORT=/performance-tests/html-report.html \
            -e ACCESS_TOKEN=$ACCESS_TOKEN \
            -e K6_WEB_DASHBOARD_PORT=-1 \
            grafana/k6 run --out web-dashboard=/performance-tests/html-report.html /performance-tests/top-rated.js
```

## To run Performance Tests in pipeline

1. Test run is automatically triggered on push or merge to `main` if changes were made to files in `performance-tests` folder.
2. Test run can be triggered manually in GitHub Actions: navigate to Actions -> click on `Run k6 Performance Tests` workflow -> click `Run workflow` on the right side of the page.

## Report

* After running Performance Tests locally, test report will be saved to `performance-tests` folder.
* After running Performance Tests in pipeline, test report will be attached to the workflow run as Artifact.



# API TESTS

API test for [TMDB website](https://www.themoviedb.org/), specifically for [GET/movie/top_rated](https://developer.themoviedb.org/reference/movie-top-rated-list) and [POST/movie/{{movie_id}}/rating](https://developer.themoviedb.org/reference/movie-add-rating) endpoints.

This project was developed using [Pytest](https://docs.pytest.org/en/stable/) and [Python](https://www.python.org/).

## To run API tests locally 

1. Install [Docker](https://www.docker.com/get-started/).
2. Set the global environment variables named ACCESS_TOKEN and BASE_URL with the provided values (sent in a separate file in email).
3. Clone this repository.
4. From the repository directory (`test-assignment` folder), run the command to build Docker image:

```
    docker build -f api-tests/Dockerfile -t api-tests .
```

5. From the same directory (`test-assignment` folder), run the command to execute tests:

```
    docker run --rm \
            -v $(pwd)/api-tests:/api-tests \
            -e ACCESS_TOKEN=$ACCESS_TOKEN \
            -e BASE_URL=$BASE_URL \
            api-tests pytest ./tests --html=results/report.html --self-contained-html
```

## To run API tests in pipeline

1. Test run is automatically triggered on push or merge to `main` if changes were made to files in `api-tests` folder.
2. Test run can be triggered manually in GitHub Actions: navigate to Actions -> click on `Run API Tests` workflow -> click `Run workflow` on the right side of the page.

## Report

* After running API Tests locally, test report will be saved to `api-tests/results` folder.
* After running API Tests in pipeline, test report will be attached to the workflow run as Artifact.


# CYPRESS UI TESTS

Cypress test for [Portal](https://wave-trial.getbynder.com/login/), specifically for Login page.

This project was developed using [Cypress](https://www.cypress.io/) and [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

## Test scenarios

This project includes the description of test cases in Gherkin (available in `ui-tests/cypress/gherkin-scenarios/login-logout.feature`) and covers the following flows:
* Successful login
* Unsuccessful login with incorrect credentials
* Login page validation for empty fields
* Login page validation for invalid email
* Login page validation for password length
* Logout from the dashboard

## To run Cypress UI tests locally 

1. Install [Docker](https://www.docker.com/get-started/).
2. Set the global environment variables named UI_BASE_URL, UI_USERNAME and UI_PASSWORD with the provided values (sent in a separate file in email).
3. Clone this repository.
4. From the repository directory (`test-assignment` folder), run the command to build the Docker image:

```
    docker build -f ui-tests/Dockerfile -t ui-tests ./ui-tests
```

5. From the same directory (`test-assignment` folder), run the command to execute the tests:

```
    docker run --rm \
        -v $(pwd)/ui-tests:/ui-tests \
        -e UI_BASE_URL=$UI_BASE_URL \
        -e UI_USERNAME=$UI_USERNAME \
        -e UI_PASSWORD=$UI_PASSWORD \
        ui-tests npm test:run
```

## To run Cypress UI tests in Pipeline

Note: Currently, Cypress UI tests fail in the pipeline due to issues with missing faker and/or mocha (reporter) modules. The issue might be due to misconfigurations in the Dockerfile or ui-tests.yml. A solution has not been found yet. Please, note that this issue with faker/mocha does not occur when tests are run locally in Docker, not in GitHub.

## Report

* After running Cypress UI Tests locally, the test report will be saved to `ui-tests/cypress/reports` folder.