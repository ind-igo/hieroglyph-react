CREATE TABLE transcripts (
    id SERIAL PRIMARY KEY,
    videoId TEXT NOT NULL,
    title TEXT NOT NULL,
    transcript TEXT NOT NULL
);