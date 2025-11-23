FROM python:3.12-slim
WORKDIR /app
COPY . /app/be_src
RUN pip install --no-cache-dir -r /app/be_src/requirements.txt
CMD ["uvicorn", "be_src.apps.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
