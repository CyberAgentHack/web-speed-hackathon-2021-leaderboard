-- CreateView
CREATE VIEW "MeasurementByHour" AS
SELECT
    date_trunc('hour', m."createdAt") AS "createdAt"
     ,m."teamId"
     ,MAX(m.score) AS "score"
     ,MAX(m.score) AS "scoreMax"
     ,MIN(m.score) AS "scoreMin"
     ,AVG(m.score) AS "scoreAvg"
FROM "Team" t
         LEFT JOIN "Measurement" m
                   ON m."teamId" = t."id"
GROUP BY date_trunc('hour', m."createdAt"), m."teamId"
