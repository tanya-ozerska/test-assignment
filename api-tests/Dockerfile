# Start with a Python base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /api-tests

# Copy the requirements file and install dependencies
COPY api-tests/requirements.txt /api-tests/requirements.txt
RUN pip install --no-cache-dir -r /api-tests/requirements.txt

# Copy the rest of the project files to the container
COPY api-tests/tests /api-tests/tests

# Run the tests and generate the HTML report
CMD ["pytest", "api-tests/tests/", "--maxfail=1", "--disable-warnings", "--html=results/report.html"]
