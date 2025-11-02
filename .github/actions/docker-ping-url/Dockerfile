FROM python:alpine3.19

WORKDIR /app

# install deps
COPY requirements.txt .
RUN \
  python -m venv venv && \
  . venv/bin/activate && \
  python -V && \
  pip install --no-cache-dir -r requirements.txt && \
  rm requirements.txt

# copy app files
COPY main.py .

CMD [ "/app/venv/bin/python", "/app/main.py" ]
