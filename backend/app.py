# app.py
from flask import Flask, jsonify
from flask_cors import CORS
import pymysql
from db_config import DB_CONFIG
import os

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/api/some-endpoint", methods=["GET"])
def some_endpoint():
    return "Hello, World!"


def get_db_connection():
    return pymysql.connect(**DB_CONFIG)




@app.route('/api/top-movies')
def top_movies():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT movie_name, rating 
        FROM movies 
        WHERE rating REGEXP '^[0-9]+(\\.[0-9]+)?$'
        ORDER BY CAST(rating AS DECIMAL(3,1)) DESC 
        LIMIT 10
    """)
    results = cursor.fetchall()
    conn.close()

    xAxis = [row[0] for row in results]
    series = [float(row[1]) for row in results]

    return jsonify({"xAxis": xAxis, "series": series})




@app.route('/api/top-directors')
def top_directors():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT director, COUNT(*) AS count
        FROM movies
        GROUP BY director
        ORDER BY count DESC
        LIMIT 10
    """)
    results = cursor.fetchall()
    conn.close()

    xAxis = [row[0] for row in results]
    series = [int(row[1]) for row in results]

    return jsonify({"xAxis": xAxis, "series": series})




@app.route('/api/movie-types')
def movie_types():
    conn = get_db_connection()
    cursor = conn.cursor()

    # 将多个类型用逗号拆分后汇总统计（最多拆到 5 个）
    cursor.execute("""
        SELECT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(movie_type, ',', n.n), ',', -1)) AS genre
        FROM movies
        JOIN (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) AS n
        WHERE movie_type IS NOT NULL
    """)

    rows = cursor.fetchall()
    conn.close()

    genre_counts = {}
    for (genre,) in rows:
        if genre:
            genre_counts[genre] = genre_counts.get(genre, 0) + 1

    # 排序并取前 10（或你需要的数量）
    sorted_data = sorted(genre_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    data = {"xAxis": [x[0] for x in sorted_data], "series": [x[1] for x in sorted_data]}

    return jsonify(data)




@app.route('/api/runtime-ranges')
def runtime_ranges():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT
            CASE
                WHEN timing <= 90 THEN '90分钟以下'
                WHEN timing BETWEEN 91 AND 120 THEN '91-120分钟'
                WHEN timing BETWEEN 121 AND 150 THEN '121-150分钟'
                ELSE '150分钟以上'
            END AS duration_range,
            COUNT(*) AS count
        FROM movies
        WHERE timing IS NOT NULL AND timing != ''
        GROUP BY duration_range
    """)
    results = cursor.fetchall()
    conn.close()

    data = [{"name": row[0], "value": int(row[1])} for row in results]

    return jsonify(data)

port = int(os.environ.get("PORT", 5000))
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=port)


